
import { BackupHandler } from "../classes/index.js";
import {
   RouteContext,
   express,
   apidoc,
   respond
} from "../context.js";
const app = express();

/** @type {RouteContext} */
let ctx;

app.get("/", (req, res) => {
   respond(req, res, 200, {
      content: BackupHandler.getAllConfigurations().export
   });
});

app.get("/:config", (req, res) => {
   respond(req, res, 200, {
      content: BackupHandler.getConfiguration(req.params.config).export
   });
});

app.post("/:config", (req, res) => {
   const _res = BackupHandler.getConfiguration(req.params.config).create();

   respond(req, res, 200, {
      content: {}
   });
});

/**
 * @param {string} route 
 * @param {RouteContext} _ctx 
 */
export default async function hook(route, _ctx) {
   ctx = _ctx;

   //
   //
   
   apidoc.defineGroup("Backup", route);
   
   //
   //

   apidoc.submitGroup();

   ctx.app.use(route, app);
};