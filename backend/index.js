#!/bin/node
import express from "express";
import { RouteContext } from "./context.js";
import r_sysinfo from "./routes/sysinfo.js";
const BASE = "/api/v0";

const app = express();
const ctx = new RouteContext(app);

r_sysinfo(`${BASE}/sys`, ctx);

app.listen(3000, () => {
   console.log("Server running...");
});