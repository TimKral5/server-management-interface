
/** @enum {string} */
export const DaemonState = {
   UP: "up",
   DOWN: "down",
   NULL: null
};

export class Daemon {
   /** @type {string} */
   get name() { throw new Error(); }

   /** @type {DaemonState} */
   get state() { throw new Error(); }
   
   /** @type {object} */
   get export() { throw new Error(); }
}