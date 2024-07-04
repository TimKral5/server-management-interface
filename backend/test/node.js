const { SMIApi } = require("./api.js");
const { notNull } = require("./tester.js");

(async function () {
   const api = new SMIApi("http://localhost:3005/api/v0");

   // Systeminformation

   await notNull("get_static_info_1",
      async fail => (await (api.getStaticInfo().catch(fail))) == undefined ? fail() : null
   );

   await notNull("get_static_info_2",
      async fail => (await (api.getStaticInfo("cpu").catch(fail))) == undefined ? fail() : null
   );

   await notNull("get_dynamic_info_1",
      async fail => (await (api.getDynamicInfo().catch(fail))) == undefined ? fail() : null
   );

   await notNull("get_dynamic_info_2",
      async fail => (await (api.getDynamicInfo("time").catch(fail))) == undefined ? fail() : null
   );

   // System Configuration
})();