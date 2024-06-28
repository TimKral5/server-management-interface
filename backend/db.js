import mariadb from "mariadb";
import config from "./config.js";
import { v4 as uuidv4 } from "uuid";

const pool = mariadb.createPool(config.database);
/** @type {mariadb.PoolConnection} */
let conn;

export async function setupConnection() {
   conn = await pool.getConnection();
}

export function closeConnection() {
   conn.release();
}

/**
 * @param {string} token 
 * @returns {Promise<boolean>}
 */
export function validateSession(token) {
   const validToken = "12345";
   return new Promise((res, rej) => res(token == validToken));
}

export default {
   setupConnection,
   closeConnection,
   validateSession,
};