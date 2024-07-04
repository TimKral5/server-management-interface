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

   const exit = use(null, { mod: "process", obj: "exit" },
      (num) => console.error(`ERROR: ${num}`));

   /**
    * 
    * @param {async () => boolean} test 
    * @param {number} err1 
    * @param {number} err2 
    */
   exports.notNull = async function (name, test, err1 = -1, err2 = -2) {

      function resolve(pass, err = undefined) {
         console.log(`[${name}] Test => ${pass ? "Passed" : "Failed"}`);
         if (err)
            exit(err);
      }

      let hasFailed = false;
      function fail() {
         hasFailed = true;
      }

      try {
         await test(fail);
         if (!hasFailed)
            resolve(true);
         else
            resolve(false, err1);
      }
      catch {
         resolve(false, err2);
      }
   }
});