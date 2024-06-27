
export class Group {
   /** @type {string} */
   name;
   /** @type {string} */
   base;
   /** @type {Route[]} */
   routes;
}

export class Route {
   /** @type {string} */
   name;
   /** @type {string} */
   type;
   /** @type {string} */
   url;
   /** @type {{[key: string]: string}} */
   query;
   /** @type {{[key: string]: string}} */
   params;
   /** @type {{[key: string]: string}} */
   body;
}

/** @type {Group[]} */
const groups = [];

/** @type {Group} */
let selectedGroup = undefined;

/**
 * @param {string} name 
 * @param {string} base 
 */
export function defineGroup(name, base) {
   selectedGroup = { name, base, routes: [] };
}

export function submitGroup() {
   groups.push(selectedGroup);
   selectedGroup = undefined;
}

/**
 * 
 * @param {string} name 
 * @param {string} method 
 * @param {string} url 
 * @param {{query: {[key: string]: string}, params: {[key: string]: string}, body: {[key: string]: string}}} param2 
 */
export function defineRoute(
   name, method, url,
   { query = null, params = null, body = null } = {}
) {
   selectedGroup.routes.push({
      name,
      type: method,
      url,
      query,
      params,
      body
   });
}

export function getRoutesJSON() {
   return JSON.stringify(groups);
}

export default {
   defineGroup,
   submitGroup,
   defineRoute,
   getRoutesJSON
};