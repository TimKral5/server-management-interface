#!/bin/node

import express from "express";
import { RouteContext, apidoc } from "./context.js";
import r_auth from "./routes/auth.js";
import r_sysinfo from "./routes/sysinfo.js";
import r_sysconfig from "./routes/sysconfig.js";
import r_backup from "./routes/backup.js";
import cors from "cors";
import { validateSession } from "./responder.js";

import { } from "./classes/index.js";

const BASE = "/api/v0";

const app = express();
const ctx = new RouteContext(app);

app.use(cors());

/* app.use(async (req, res, next) => {
   if (!(await validateSession(req, res)))
      return;
   next("route");
}); */

app.get(`${BASE}/routes`, (req, res) => {
   res.header("Content-Type", "application/json");
   res.status(200);
   res.send(apidoc.getRoutesJSON());
});

(async () => {
   await r_auth(`${BASE}/auth`, ctx);
   await r_sysinfo(`${BASE}/sys/info`, ctx);
   await r_sysconfig(`${BASE}/sys/config`, ctx);
   await r_backup(`${BASE}/sys/backup`, ctx);

   app.listen(3005, () => {
      console.log("Server running...");
   });
})();