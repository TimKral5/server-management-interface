
import {
   RouteContext,
   express,
   si,
   apidoc,
   respond,
   db,
   responder
} from "../context.js";
const app = express();


/** @type {RouteContext} */
let ctx;

/** @type {{[key: string]: object}} */
let staticInfo = {};
/** @type {{[key: string]: object}} */
let dynamicInfo = {};

async function getStaticInfo() {
   const data = await si.getAllData();

   const result = {
      os: {
         platform: data.os.platform,
         distro: data.os.distro,
         hostname: data.os.hostname
      },
      cpu: {
         brand: data.cpu.brand,
         core_count: data.cpu.cores
      },
      disks: [],
      mem: {
         size: data.mem.total
      }
   };

   data.diskLayout.forEach(disk => {
      const _data = {
         device: disk.device,
         type: disk.type,
         size: disk.size
      };

      result.disks.push(_data);
   });

   return result;
}

async function getDynamicInfo() {
   const data = await si.getDynamicData();

   const result = {
      time: {
         uptime: data.time.uptime,
         system_load: data.currentLoad.currentLoadSystem
      }
   };

   return result;
}

/**
 * @param {{[key: string]: any}} obj
 * @param {string} type
 * @returns {any} 
 */
function decodeInfoType(obj, type) {
   let result = obj;
   type.split(".").forEach(t => result = Object.keys(result).includes(t) ? result[t] : {});
   return result;
}

app.get("/static", async (req, res) => {
   if (await responder.validateSession(req, res))
      return;


   respond(res, 200, {
      content: JSON.stringify(staticInfo)
   });
});

app.get("/dynamic", async (req, res) => {
   if (await responder.validateSession(req, res))
      return;

   respond(res, 200, {
      content: JSON.stringify(dynamicInfo)
   });
});

app.get("/static/:type", async (req, res) => {
   if (await responder.validateSession(req, res))
      return;

   const type = req.params.type;
   const result = decodeInfoType(staticInfo, type);

   respond(res, 200, {
      content: JSON.stringify(result)
   });
});

app.get("/dynamic/:type", async (req, res) => {
   if (await responder.validateSession(req, res))
      return;

   const type = req.params.type;
   const result = decodeInfoType(dynamicInfo, type);

   respond(res, 200, {
      content: JSON.stringify(result)
   });
});

/**
 * @param {string} route 
 * @param {RouteContext} _ctx 
 */
export default async function hook(route, _ctx) {
   ctx = _ctx;

   staticInfo = await getStaticInfo();
   setInterval(async () =>
      staticInfo = await getStaticInfo(),
      ctx.config.intervals.fetch_static_info);

   dynamicInfo = await getDynamicInfo();
   setInterval(async () =>
      dynamicInfo = await getDynamicInfo(),
      ctx.config.intervals.fetch_dynamic_info);

   apidoc.defineGroup("Systeminformation", route);

   apidoc.defineRoute(
      "GetStaticInfo",
      "GET",
      "/static"
   );

   apidoc.defineRoute(
      "GetDynamicInfo",
      "GET",
      "/dynamic"
   );

   apidoc.defineRoute(
      "GetFilteredStaticInfo",
      "GET",
      "/static/:type",
      {
         params: {
            type: "string"
         }
      }
   );

   apidoc.defineRoute(
      "GetFilteredDynamicInfo",
      "GET",
      "/dynamic/:type",
      {
         params: {
            type: "string"
         }
      }
   );

   apidoc.submitGroup();

   ctx.app.use(route, app);
};