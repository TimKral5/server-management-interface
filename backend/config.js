import mariadb from "mariadb";

export default {
   intervals: {
      fetch_static_info: 30000,
      fetch_dynamic_info: 300
   },

   /** @type {mariadb.PoolConfig} */
   database: {
      host: "localhost",
      user: "root"
   },

   paths: {
      compose: "./containers"
   }
};