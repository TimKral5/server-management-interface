import { spawnSync, execSync } from "child_process";
import { Daemon, DaemonState } from "./interfaces/daemon.js";

export class ServiceInfo extends Daemon {
   /** @type {string} */
   name;

   /**
    * @param {string} name 
   */
   constructor(name) {
      super();
      this.name = name;
   }

   __fetchInfo() {
      const command = `sudo service '${this.name}' status`;
      try {
         return execSync(command, {}).toString();
      }
      catch (err) {
         return err.output.toString();
      }
   }

   get state() {
      const _info = this.__fetchInfo();

      if (_info.split("\n").length <= 1)
         return null;

      const info = ((_info
         .match(/^\s*Active:\s*\w*/gm) ?? [""])[0]
         .match(/\w*$/gm) ?? [null])[0];

      switch (info) {
         case "active":
            return DaemonState.UP;
         case "inactive":
            return DaemonState.DOWN;
         default:
            return DaemonState.NULL;
      }
   }

   get enabled() {
      const _info = this.__fetchInfo();

      if (_info.split("\n").length <= 1)
         return null;

      const info = (((_info
         .match(/^\s*Loaded:.*$/gm) ?? [""])[0]
         .match(/\w+; preset/gm) ?? [""])[0]
         .match(/^\w+/gm) ?? [null])[0];
      return info;
   }

   get description() {
      const _info = this.__fetchInfo();

      if (_info.split("\n").length <= 1)
         return null;

      const info = (_info
         .match(/^.*$/gm) ?? [""])[0]
         .slice((_info.match(/^\s*\S*(○|●)\s+\S+\s+\S+\s+/g) ?? [""])[0].length);
      return info == "" ? null : info;
   }

   get fullName() {
      const _info = this.__fetchInfo();

      if (_info.split("\n").length <= 1)
         return null;

      const info = ((_info
         .match(/^\s*\S*(○|●)\s+\S+/g) ?? [""])[0]
         .match(/\S+$/g) ?? [null])[0];
      return info;
   }
   get export() {
      return {
         name: this.name,
         active: this.active,
         enabled: this.enabled,
         description: this.description,
         fullName: this.fullName
      };
   }

   stop() {
      const command = `sudo service ${this.name} stop`;
      try {
         execSync(command);
      } catch { }
   }

   start() {
      const command = `sudo service ${this.name} start`;
      try {
         execSync(command);
      } catch { }
   }

   enable() {
      // FIXME: Use some native alternative for systemctl 
      const command = `sudo systemctl enable ${this.name}`;
      try {
         execSync(command);
      } catch { }
   }

   disable() {
      // FIXME: Use some native alternative for systemctl 
      const command = `sudo systemctl disable ${this.name}`;
      try {
         execSync(command);
      } catch { }
   }
}

/**
 * @returns {Promise<string[]>}
 */
export function getAllServices() {
   return new Promise((res, rej) => {
      const pattern = /^\s*\[\s*[-+]\s*\]\s*/gm;
      const _res = execSync("sudo service --status-all").toString();
      const results = [];
      _res.split("\n").forEach(el => {
         const service = el.slice((el.match(pattern) ?? [""])[0].length);
         if (service != "")
            results.push(service);
      });
      res(results);
   });
}

export class ServiceHandler {

   /**
    * @param {string} name
    * @returns {Promise<ServiceInfo>} 
    */
   static async getService(name) {
      const services = await getAllServices();
      const exists = services.includes(name);

      if (exists)
         return new ServiceInfo(name);
      else
         return undefined;
   }

   /**
    * @returns {Promise<ServiceInfo[]>} 
    */
   static async getAllServices() {
      const services = await getAllServices();
      const results = [];

      services.forEach(el => results.push(el));
      return results;
   }

   async test() {
   }
}