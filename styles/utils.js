import { TaggedDocument } from "./tags.js";
import { config } from "./index.js";

/** @type {((doc: TaggedDocument, i: number) => void)[]} */
export const utils = [
   /* Active Tabs */
   (doc, i) => doc.findAll("id").argIs(config.pages[i].id).replace("active"),
   (doc, i) => doc.findAll("id").argIs(config.pages[i].id, true).replace(""),
   (doc, i) => doc.findAll("disabled").replace("disabled aria-hidden=\"true\"")
];