import _express from "express";
import _si from "systeminformation";

export class RouteContext {
   /** @type {express.Express} */
   app;

   /**
    * @param {express.Express} app 
    */
   constructor(app) {
      this.app = app;
   }
}

/**
 * @returns {_express.Express}
 */
export function express() {
   return _express();
}

export function si() {
   return _si;
}