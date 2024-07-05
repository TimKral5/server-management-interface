import config from "../config.js";
import { cpSync, createWriteStream, existsSync, mkdirSync, rmSync } from "fs";
import archiver from "archiver";

export class BackupInfo {
   constructor() { }
}

export class BackupConfigInfo {
   /** @type {string} */
   config;
   /** @type {string[]} */
   includes;
   /** @type {string} */
   dir;

   /**
    * @param {object} config 
    */
   constructor(dir, config, includes) {
      this.dir = dir;
      this.config = config;
      this.includes = includes;
   }

   /**
    * @returns {BackupInfo}
    */
   create() {
      if (this.isEmpty)
         return null;

      if (!existsSync(this.dir))
         mkdirSync(this.dir, { recursive: true });

      const output = createWriteStream(`${this.dir}/${this.config}_${Date.now()}.zip`);
      const archive = archiver("zip");

      archive.pipe(output);
      this.includes.forEach(_dir => archive.directory(_dir, _dir.split("/")[-1]));
      archive.finalize();
   }

   /** @type {boolean} */
   get isEmpty() {
      if (
         this.dir == undefined ||
         this.config == undefined ||
         this.includes == undefined
      )
         return true;
      return false;
   }

   get export() {
      return {
         isEmpty: this.isEmpty,
         dir: this.dir,
         config: this.config,
         includes: this.includes
      };
   }
}

export class BackupConfigInfoCollection {
   /** @type {BackupConfigInfo[]} */
   items;

   /**
    * @param {BackupConfigInfo[]} items 
    */
   constructor(items) {
      this.items = items;
   }

   /**
    * @param {string} config 
    * @returns {BackupConfigInfo}
    */
   find(config) {
      for (let i = 0; i < this.items.length; i++) {
         const item = this.items[i];
         if (item.config == config)
            return item;
      }

      return new BackupConfigInfo(null, null, null);
   }

   get export() {
      const results = [];
      this.items.forEach(el => results.push(el.config));
      return results;
   }
}

export class BackupHandler {

   /**
    * @returns {BackupConfigInfoCollection}
    */
   static getAllConfigurations() {
      const configs = Object.keys(config.backup.configurations);
      const results = [];
      configs.forEach(el => results.push(new BackupConfigInfo(
         config.backup.dir,
         el,
         config.backup.configurations[el]
      )));
      return new BackupConfigInfoCollection(results);
   }

   /**
    * @param {string} _config 
    */
   static getConfiguration(_config) {
      const configuration = this.getAllConfigurations().find(_config);
      return configuration;
   }
}