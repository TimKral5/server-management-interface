import fs from "fs";
import { TaggedDocument } from "./tags.js";
import { utils } from "./utils.js";

export const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

/**
 * @param {string} path 
 * @returns {string}
 */
function pathToRoot(path) {
   const steps = path.split("/").length - 2;
   let _path = ".";
   for (let i = 0; i < steps; i++)
      _path += "/..";
   return _path;
}

/** @type {{[key: string]: TaggedDocument}} */
const templates = {};
/** @type {{[key: string]: TaggedDocument}} */
const pages = {};

const dynamicSiteMeta = {
   "root": (i) => pathToRoot(config.pages[i].endpoint),
   "assets": (i) => pathToRoot(config.pages[i].endpoint)
};

const dynamicPageMeta = {
   "content": i =>
      fs.readFileSync(config.pages[i].file).toString()
}

// Load and build the Templates
Object.entries(config.site.templates).forEach(el => {
   const name = el[0];
   const filepath = el[1];

   let template = new TaggedDocument(fs.readFileSync(filepath).toString());
   
   Object.entries(config.site.meta).forEach(el => {
      const key = el[0];
      const value = el[1];

      template.findAll(`${config.prefixes.site}${key}`)
         .replace(value);
   });

   templates[name] = template;
});

// Load and build the Pages
config.pages.forEach((page, i) => {
   let file = templates[page.template].clone();

   // Static Page Metadata
   Object.entries(page.meta).forEach(el => {
      const key = el[0];
      const value = el[1];

      file.findAll(`${config.prefixes.page}${key}`)
         .replace(value);
   });

   // Dynamic Site Metadata
   Object.entries(dynamicSiteMeta).forEach(el => {
      const key = el[0];
      const func = el[1];

      file.findAll(`${config.prefixes.site}${key}`)
         .replace(func(i));
   });

   // Dynamic Page Metadata
   Object.entries(dynamicPageMeta).forEach(el => {
      const key = el[0];
      const func = el[1];

      file.findAll(`${config.prefixes.page}${key}`)
      .replace(func(i));
   });

   // Utilities
   utils.forEach(util => util(file, i));

   pages[page.endpoint] = file;
});

// Write results to file
Object.entries(pages).forEach(page => {
   const path = page[0];
   const content = page[1].document;

   let outDir = config.out.dir;
   outDir = outDir.endsWith("/") ? outDir.slice(0, -1) : outDir
   const outFile = `${outDir}${path}`;
   const dir = outFile.split("/").slice(0, -1).join("/");

   fs.mkdirSync(dir, { recursive: true });
   fs.writeFileSync(outFile, content);
});

config.assets.files
   .forEach(file => fs.copyFileSync(file, `${config.out.dir}${file.split("/")[file.split("/").length - 1]}`));