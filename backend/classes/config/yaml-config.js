import { parse, stringify } from "yaml";
import { readFileSync, writeFileSync } from "fs";

export class YamlConfig {
   /**
    * @param {string} str
    * @returns {object} 
    */
   static parse(str) {
      const obj = parse(str);
      return obj;
   }

   /**
    * @param {object} obj 
    * @returns {string}
    */
   static stringify(obj) {
      const str = stringify(obj);
      return str;
   }
}