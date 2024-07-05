const { SMIApi } = require("./api.js");
const { doTest } = require("./tester.js");

(async function () {
   const api = new SMIApi("http://localhost:3005/api/v0");

   console.log("\n System Information:");

   await doTest("get_static_info_1",
      async fail => (await (api.getStaticInfo().catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_static_info_2",
      async fail => (await (api.getStaticInfo("cpu").catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_dynamic_info_1",
      async fail => (await (api.getDynamicInfo().catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_dynamic_info_2",
      async fail => (await (api.getDynamicInfo("time").catch(fail))) == undefined ? fail() : null
   );

   console.log("\n System Configuration:");

   await doTest("get_all_compose_instances",
      async fail => (await (api.getAllComposeInstances().catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_compose_instance",
      async fail => (await (api.getComposeInstance("mariadb").catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_compose_container",
      async fail => (await (api.getComposeContainer("mariadb", "db").catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_all_services",
      async fail => (await (api.getAllServices("mariadb", "db").catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_service",
      async fail => (await (api.getService((await api.getAllServices())[0]).catch(fail))) == undefined ? fail() : null
   );

   console.log("\n Backup:");

   await doTest("get_all_backup_configurations",
      async fail => (await (api.getAllBackupConfigurations().catch(fail))) == undefined ? fail() : null
   );

   await doTest("get_backup_configuration",
      async fail => (await (api.getBackupConfiguration((await api.getAllBackupConfigurations())[0]).catch(fail))) == undefined ? fail() : null
   );

   await doTest("create_backup",
      async fail => (await (api.createBackup((await api.getAllBackupConfigurations())[0]).catch(fail))) == undefined ? fail() : null
   );
})();