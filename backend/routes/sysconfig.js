import express from "express";

import {
   RouteContext,
   apidoc,
   respond
} from "../context.js";

import {
   ContainerHandler,
   ServiceHandler
} from "../classes/index.js"

import config from "../config.js";

const app = express();

/** @type {RouteContext} */
let ctx;

//#region compose
app.get("/compose", (req, res) => {
   respond(req, res, 200, {
      content: ContainerHandler
         .getAllComposeInstances(
            config.paths.compose
         ).export
   });
});

app.get("/compose/:compose", (req, res) => {
   const compose = req.params["compose"];
   respond(req, res, 200, {
      content: ContainerHandler
         .getComposeInstance(
            config.paths.compose,
            compose
         ).export
   });
});

app.get("/compose/:compose/:container", (req, res) => {
   const compose = req.params["compose"];
   const container = req.params["container"];
   respond(req, res, 200, {
      content: ContainerHandler
         .getComposeInstance(
            config.paths.compose,
            compose
         ).containers
         .find(container).export
   });
});
//#endregion

//#region services
app.get("/services", async (req, res) => {
   respond(req, res, 200, {
      content: await ServiceHandler.getAllServices()
   });
});

app.get("/services/:service", async (req, res) => {
   respond(req, res, 200, {
      content: (await ServiceHandler.getService(req.params.service)).export
   });
});

app.put("/services/:service/stop", async (req, res) => {
   const _res = (await ServiceHandler.getService(req.params.service)).stop();

   respond(req, res, 200, {
      content: {}
   });
});

app.put("/services/:service/start", async (req, res) => {
   const _res = (await ServiceHandler.getService(req.params.service)).start();

   respond(req, res, 200, {
      content: {}
   });
});

app.put("/services/:service/enable", async (req, res) => {
   const _res = (await ServiceHandler.getService(req.params.service)).enable();

   respond(req, res, 200, {
      content: {}
   });
});

app.put("/services/:service/disable", async (req, res) => {
   const _res = (await ServiceHandler.getService(req.params.service)).disable();

   respond(req, res, 200, {
      content: {}
   });
});
//#endregion

/**
 * @param {string} route 
 * @param {RouteContext} _ctx 
 */
export default async function hook(route, _ctx) {
   ctx = _ctx;

   //
   //

   apidoc.defineGroup("Configuration", route);

   //
   //

   apidoc.submitGroup();

   ctx.app.use(route, app);
};