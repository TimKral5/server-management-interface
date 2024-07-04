
import { YamlConfig } from "./yaml-config.js";
import { readFileSync, writeFileSync } from "fs";

/**
 * @param {string} type 
 */
function getHandler(type) {
      switch (type) {
         case "yaml":
            return YamlConfig;
         default:
            throw new Error();
      }
   }

export class ConfigHandler {
   /**
    * @param {string} str
    * @param {string} type 
    * @returns {object} 
    */
   static parse(str, type) {
      const handler = getHandler(type);
      return handler.parse(str);
   }

   /**
    * @param {object} obj 
    * @param {string} type 
    * @returns {string}
    */
   static stringify(obj, type) {
      const handler = getHandler(type);
      return handler.stringify(obj);
   }

   /**
    * @param {string} file 
    * @param {string} type 
    * @returns {object}
    */
   static fromfile(file, type) {
      const content = readFileSync(file).toString();
      return this.parse(content, type);
   }

   /**
    * @param {string} file 
    * @param {string} type 
    * @param {object} obj 
    */
   static toFile(file, type, obj) {
      const content = this.stringify(obj, type);
      writeFileSync(file, content);
   }
}