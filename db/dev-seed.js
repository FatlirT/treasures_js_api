const data = require("./data/dev-data");
const seed = require("./seed");
const db = require("./");

const seedDev = () => seed(data).then(() => db.end());
module.exports = seedDev();
