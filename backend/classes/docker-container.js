import { spawnSync, execSync } from "child_process";
import { ConfigHandler } from "./index.js";
import { Daemon, DaemonState } from "./interfaces/daemon.js";

import { existsSync, readFileSync, readdirSync } from "fs";
import { fsOpenFiles } from "systeminformation";

/**
 * @param {string} pool
 * @param {string} compose
 * @returns {object}
 */
function getConfig(pool, compose) {
   const config = ConfigHandler.fromfile(`${pool}/${compose}/compose.yaml`, "yaml");
   return config;
}

/**
 * @param {string} pool
 * @param {string} compose
 * @returns {string}
 */
function getStatus(pool, compose) {
   const command = `cd "${pool}/${compose}/"; sudo docker-compose ps --all`;
   const result = execSync(command).toString();
   return result;
}

//#region container
export class ContainerInfoCollection {
   /** @private @type {ContainerInfo[]} */
   entries;

   /**
    * @param {ContainerInfo[]} entries 
    */
   constructor(entries) {
      this.entries = entries;
   }

   get export() {
      const results = [];
      this.entries.forEach(el => results.push(el.name));
      return results;
   }

   /**
    * @param {string} name 
    * @returns {ContainerInfo}
    */
   find(name) {
      for (let i = 0; i < this.entries.length; i++) {
         const entry = this.entries[i];

         if (entry.name == name)
            return entry;
      }

      return new ContainerInfo(null, null);
   }
}

export class ContainerInfo extends Daemon {
   /** @private @type {ComposeInfo} */
   compose;
   /** @private @type {string} */
   name;

   /**
    * @param {ComposeInfo} compose 
    */
   constructor(compose, name) {
      super();
      this.compose = compose;
      this.name = name;
   }

   /** @type {boolean} */
   get isEmpty() {
      return !this.compose || !this.name;
   }

   /** @private @type {object} */
   get __config() {
      if (this.isEmpty)
         return {};

      const pool = this.compose.pool;
      const compose = this.compose.compose;

      const config = getConfig(pool, compose);
      return config["services"][this.name];
   }

   /** @type {string} */
   get fullName() {
      if (this.isEmpty)
         return null;
      return `${this.compose.compose}_${this.name}_1`;
   }

   /** @type {string} */
   get image() {
      return this.__config["image"];
   }

   /** @type {string} */
   get restart() {
      return this.__config["restart"];
   }

   /** @type {{[key: string]: string | number}} */
   get environment() {
      return this.__config["environment"] ?? {};
   }

   /** @type {{[key: string]: string | number}} */
   get volumes() {
      return this.__config["volumes"] ?? {};
   }

   get export() {
      return {
         isEmpty: this.isEmpty,
         name: this.name,
         fullName: this.fullName,
         image: this.image,
         restart: this.restart,
         environment: this.environment,
         volumes: this.volumes
      };
   }

   get state() {
      const status = getStatus(this.compose.pool, this.compose.compose)
         .match(new RegExp(`^(${this.fullName})\\s+(\\S+\\s+){2}\\S+`, "gm"))[0]
         .match(new RegExp("\\w*$", "gm"))[0];

      switch (status) {
         case "Up":
            return DaemonState.UP;
         case "Down":
            return DaemonState.DOWN;
         default:
            return DaemonState.NULL;
      }
   }
}
//#endregion

/**
 * @param {string} pool 
 * @param {string} compose 
 * @returns {string}
 */
function listAllComposeContainers(pool, compose) {
   const config = getConfig(pool, compose);

   const containers = [];
   Object.entries(config["services"]).forEach(el =>
      containers.push(el[0]));

   return containers;
}

//#region compose
export class ComposeInfoCollection {
   /** @type {ComposeInfo[]} */
   entries;

   /**
    * @param {ComposeInfo[]} entries 
    */
   constructor(entries) {
      this.entries = entries;
   }

   get export() {
      const results = [];
      this.entries.forEach(el => results.push(el.compose));
      return results;
   }

   /**
    * @param {string} compose 
    * @returns {ContainerInfo}
    */
   find(compose) {
      for (let i = 0; i < this.entries.length; i++) {
         const entry = this.entries[i];

         if (entry.compose == compose)
            return entry;
      }

      return new ContainerInfo(null, null);
   }
}

export class ComposeInfo {
   /** @private @type {string} */
   pool;
   /** @private @type {string} */
   compose;

   constructor(pool, compose) {
      if (!existsSync(`${pool}/${compose}/compose.yaml`))
         return;
      this.pool = pool;
      this.compose = compose;
   }

   /** @type {boolean} */
   get isEmpty() {
      return !this.pool || !this.compose;
   }

   /** @type {ContainerInfoCollection} */
   get containers() {
      if (this.isEmpty)
         return new ContainerInfoCollection([]);

      const containers = listAllComposeContainers(this.pool, this.compose);

      const result = [];
      containers.forEach(el => result.push(new ContainerInfo(this, el)))

      return new ContainerInfoCollection(result);
   }

   get export() {
      return {
         isEmpty: this.isEmpty,
         pool: this.pool,
         compose: this.compose,
         containers: this.containers.export
      };
   }
}
//#endregion

/**
 * @param {string} pool
 * @returns {string[]} 
 */
export function getAllComposeInstances(pool) {
   const dir = readdirSync(pool);
   return dir;
}

export class ContainerHandler {

   /**
    * @param {string} pool
    * @param {string} compose
    * @returns {ComposeInfo} 
    */
   static getComposeInstance(pool, compose) {
      const instances = getAllComposeInstances(pool);
      if (instances.includes(compose))
         return new ComposeInfo(pool, compose);
      else
         return new ComposeInfo(null, null);
   }

   /**
    * @param {string} pool
    * @param {string} compose
    * @returns {ComposeInfoCollection} 
    */
   static getAllComposeInstances(pool) {
      const instances = getAllComposeInstances(pool);
      const results = [];
      instances.forEach(el =>
         results.push(new ComposeInfo(pool, el)));
      return new ComposeInfoCollection(results);
   }
}