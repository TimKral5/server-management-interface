
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

   let _use = (name, { mod = null, obj = null }) => {
      const _obj = getPart(_global, name);
      if (_obj == undefined)
         return getPart(require(mod), obj);
      return _obj;
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
       */
      getStaticInfo(cb, type = undefined) {
         /** @type {XMLHttpRequest} */
         const req = new XMLHttpRequest();

         req.open("GET", `${this.apiBase}/sys/info/static`);
         req.setRequestHeader("X-SESSION-TOKEN", this.sessionToken);

         req.send();
         req.addEventListener("loadend",
            () => cb(req.responseText));

         console.log(`[${req.getAllResponseHeaders()}]`);
      }
   };
});