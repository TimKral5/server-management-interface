import express from "express";
import { db } from "./context.js";

/**
 * @param {express.Response} res 
 * @param {number} status 
 */
export function respond(res, status, {content = "NULL", details = undefined} = {}) {
   res.header("Content-Type", "application/json");

   res.status(status);
   switch (status) {
      case 200:
         res.send(content);
         break;
      default:
         res.send(JSON.stringify({
            status: status,
            details
         }));
         break;
   }
   res.end();
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function validateSession(req, res) {
   const sessionToken = req.header("X-SESSION-TOKEN");

   if (!(await db.validateSession(sessionToken))) {
      respond(res, 401, {
         details: "Invalid Session Token"
      });

      return true;
   }

   return false;
}

export default {
   respond,
   validateSession
};