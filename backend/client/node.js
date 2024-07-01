const { SMIApi } = require("./api.js");

const api = new SMIApi("http://localhost:3005/api/v0");
api.getStaticInfo((data) => console.log(data));