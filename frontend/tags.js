
class Tag {
   /** @type {TaggedDocument} */
   document;
   /** @type {string} */
   fullTag;
   /** @type {string} */
   name;
   /** @type {string} */
   arg;

   /**
    * @param {TaggedDocument} doc 
    * @param {string} name 
    * @param {string} arg 
    */
   constructor(doc, fullTag, name, arg) {
      this.document = doc;
      this.fullTag = fullTag;
      this.name = name;
      this.arg = arg;
   }

   /**
    * @param {string} val
    * @returns {TaggedDocument}
    */
   replace(val) {
      this.document.document = this.document.document.split(`{{${this.fullTag}}}`)
         .join(val);
      this.document.__eval();
      return this.document;
   }

   /**
    * @param {string} val 
    * @param {(tag: Tag) => {}} cb
    * @param {boolean} invert
    * @returns {Tag}
    */
   argIs(val, cb, invert = false) {
      if ((val == this.arg) != invert)
         cb(this);
      return this;
   }
}

class TagCollection {
   /** @type {Tag[]} */
   tags;

   /**
    * @param {Tag[]} tags 
    */
   constructor(tags) {
      this.tags = tags;
   }

   /**
    * @param {string} val 
    */
   replace(val) {
      return this.tags.forEach(el => el.replace(val));
   }

   /**
    * @param {string} val 
    * @param {boolean} invert 
    * @returns {TagCollection}
    */
   argIs(val, invert = false) {
      let results = [];

      this.tags.forEach(tag =>
         tag.argIs(val, t =>
            results.push(t), invert)
      );

      return new TagCollection(results);
   }
}

class TaggedDocument {
   /** @type {string} */
   document;
   /** @type {Tag[]} */
   tags;

   __eval() {
      this.tags = [];
      this.document
         .split("{{")
         .slice(1)
         .forEach(el => {
            const tag = el.split("}}")[0];
            const keyValuePair = tag.split(":");

            const key = keyValuePair[0];
            let value = undefined;

            if (keyValuePair.length > 1)
               value = keyValuePair[1];

            this.tags.push(new Tag(this, tag, key, value));
         });
   }

   /**
    * @param {string} doc 
    */
   constructor(doc) {
      this.document = doc;
      this.__eval();
   }

   clone() {
      return new TaggedDocument(this.document);
   }

   /**
    * @param {string} tag 
    * @returns {TagCollection}
    */
   findAll(tag) {
      let result = [];
      this.tags.forEach(el => el.name == tag
         ? result.push(el)
         : null
      );
      return new TagCollection(result);
   }
}

exports.Tag = Tag;
exports.TagCollection = TagCollection;
exports.TaggedDocument = TaggedDocument;