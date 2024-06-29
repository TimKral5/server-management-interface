const { TaggedDocument } = require("./tags.js");
const config = require("./config.json");

/** @type {((doc: TaggedDocument, i: number) => void)[]} */
exports.utils = [
   /* Active Tabs */
   (doc, i) => doc.findAll("id").argIs(config.pages[i].id).replace("active"),
   (doc, i) => doc.findAll("id").argIs(config.pages[i].id, true).replace(""),
   (doc, i) => doc.findAll("disabled").replace("disabled aria-hidden=\"true\"")
];