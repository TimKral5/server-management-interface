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
   respond(res, 200, {
      content: ContainerHandler
         .getAllComposeInstances(
            config.paths.compose
         ).export
   });
});

app.get("/compose/:compose", (req, res) => {
   const compose = req.params["compose"];
   respond(res, 200, {
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
   respond(res, 200, {
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
   respond(res, 200, {
      content: await ServiceHandler.getAllServices()
   });
});

app.get("/services/:service", async (req, res) => {
   respond(res, 200, {
      content: (await ServiceHandler.getService(req.params.service)).export
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