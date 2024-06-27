import _express from "express";
import _si from "systeminformation";
import _apidoc from "./apidoc.js";
import config from "./config.js";

export class RouteContext {
   /** @type {_express.Express} */
   app;
   /** @type {config} */
   config;

   /**
    * @param {express.Express} app 
    */
   constructor(app) {
      this.app = app;
      this.config = config;
   }
}

/**
 * @returns {_express.Express}
 */
export function express() {
   return _express();
}

export const si = _si;
export const apidoc = _apidoc;