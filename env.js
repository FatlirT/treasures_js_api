const ENV = process.env.NODE_ENV || "dev";
const path = `${__dirname}/.env.${ENV}`;
require("dotenv").config({ path });
