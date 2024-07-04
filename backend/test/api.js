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
         return new Promise((res, rej) => {
            /** @type {XMLHttpRequest} */
            const req = new XMLHttpRequest();

            if (type)
               req.open("GET", `${this.apiBase}/sys/info/static/${type}`);
            else
               req.open("GET", `${this.apiBase}/sys/info/static`);

            req.setRequestHeader("X-SESSION-TOKEN", this.sessionToken);

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
      
      /**
       * @param {(data: object) => void} cb 
       * @param {string | undefined} type 
       * @returns {Promise<object>}
       */
      getDynamicInfo(type = undefined) {
         return new Promise((res, rej) => {
            /** @type {XMLHttpRequest} */
            const req = new XMLHttpRequest();

            if (type)
               req.open("GET", `${this.apiBase}/sys/info/dynamic/${type}`);
            else
               req.open("GET", `${this.apiBase}/sys/info/dynamic`);

            req.setRequestHeader("X-SESSION-TOKEN", this.sessionToken);

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
   };
});