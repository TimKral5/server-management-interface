
import { RouteContext, express, apidoc } from "../context.js";
const app = express();

/** @type {RouteContext} */
let ctx;

//
//
//
//

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