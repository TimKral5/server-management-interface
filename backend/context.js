import _express from "express";
import _si from "systeminformation";
import _apidoc from "./apidoc.js";
import config from "./config.js";
import _db from "./db.js";
import _responder from "./responder.js";

export class RouteContext {
   /** @type {_express.Express} */
   app;
   /** @type {config} */
   config;

   /**
    * @param {_express.Express} app 
    */
   constructor(app) {
      this.app = app;
      this.config = config;
   }
}

export const express = _express;
export const si = _si;
export const apidoc = _apidoc;
export const db = _db;
export const respond = _responder.respond;
export const responder = _responder;