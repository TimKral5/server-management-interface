(function (func) {
   let _global;
   let _exports;

   function getPart(obj, name) {
      let _obj = obj;
      if (name != undefined)
         name.split(".").forEach(part => _obj = _obj[part]);
      return _obj;
   }

   typeof (module) != "undefined" && module.exports
      ? (_global = module) && (_exports = _global.exports) :
      typeof (globalThis) != "undefined"
         ? (_global = globalThis) && (_exports = _global) :
         typeof (global) != "undefined"
            ? (_global = global) && (_exports = _global) : null;

   let _use = (...args) => {
      let name, conf, altResult;

      if (args.length > 1) {
         name = args[0];
         conf = args[1];

         if (args.length > 2)
            altResult = args[2];
      }
      else
         conf = args[0];

      let res;
      if (name != undefined)
         res = getPart(_global, name);
      if (res === undefined && typeof (require) != "undefined")
         res = getPart(require(conf.mod), conf.obj);
      if (res === undefined && altResult !== undefined)
         res = altResult;

      return res;
   };

   func(_exports, _use);
})((exports, use) => {

   const XMLHttpRequest = use("XMLHttpRequest", { mod: "xmlhttprequest", obj: "XMLHttpRequest" });

   /**
    * 
    * @param {string} method 
    * @param {string} url 
    * @param {{sessionToken: string}} param2 
    * @returns 
    */
   function performReq(method, url, { sessionToken = undefined } = {}) {
      return new Promise((res, rej) => {
         /** @type {XMLHttpRequest} */
         const req = new XMLHttpRequest();

         req.open(method, url);

         if (sessionToken)
            req.setRequestHeader("X-SESSION-TOKEN", sessionToken);

         req.send();
         req.addEventListener("loadend",
            () => {
               const obj = JSON.parse(req.responseText);

               if (req.status == 200)
                  res(obj);
               else
                  rej(obj);
            }
         );
         req.addEventListener("error", rej);
      });
   }

   exports.SMIApi = class SMIApi {
      /** @type {string} */
      apiBase;


      /** @type {string} */
      userhash;
      /** @type {string} */
      passwdhash;
      /** @type {string} */
      sessionToken = 12345;

      /**
       * @param {string} base 
       */
      constructor(base) {
         this.apiBase = base;
      }

      /**
       * @param {string} user 
       * @param {string} passwd 
       */
      login(user, passwd) { } // TODO

      /**
       * @param {(data: object) => void} cb 
       * @param {string | undefined} type 
       * @returns {Promise<object>}
       */
      getStaticInfo(type = undefined) {
         let url = `${this.apiBase}/sys/info/static`;
         if (type)
            url += `/${type}`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {(data: object) => void} cb 
       * @param {string | undefined} type 
       * @returns {Promise<object>}
       */
      getDynamicInfo(type = undefined) {
         let url = `${this.apiBase}/sys/info/dynamic`;
         if (type)
            url += `/${type}`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @returns {Promise<object[]>}
       */
      getAllComposeInstances() {
         const url = `${this.apiBase}/sys/config/compose`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} compose
       * @returns {Promise<object>} 
       */
      getComposeInstance(compose) {
         const url = `${this.apiBase}/sys/config/compose/${compose}`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} compose 
       * @param {string} container 
       * @returns {Promise<object>} 
       */
      getComposeContainer(compose, container) {
         const url = `${this.apiBase}/sys/config/compose/${compose}/${container}`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @returns {Promise<object[]>} 
       */
      getAllServices() {
         const url = `${this.apiBase}/sys/config/services`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} service 
       * @returns {Promise<object>} 
       */
      getService(service) {
         const url = `${this.apiBase}/sys/config/services/${service}`;
         return performReq("GET", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} service 
       * @returns {Promise<object>} 
       */
      stopService(service) {
         const url = `${this.apiBase}/sys/config/services/${service}/stop`;
         return performReq("PUT", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} service 
       * @returns {Promise<object>} 
       */
      startService(service) {
         const url = `${this.apiBase}/sys/config/services/${service}/start`;
         return performReq("PUT", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} service 
       * @returns {Promise<object>} 
       */
      enableService(service) {
         const url = `${this.apiBase}/sys/config/services/${service}/enable`;
         return performReq("PUT", url, {
            sessionToken: this.sessionToken
         });
      }

      /**
       * @param {string} service 
       * @returns {Promise<object>} 
       */
      disableService(service) {
         const url = `${this.apiBase}/sys/config/services/${service}/disable`;
         return performReq("PUT", url, {
            sessionToken: this.sessionToken
         });
      }
   };
});