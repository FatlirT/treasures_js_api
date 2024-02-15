const db = require(`${__dirname}/db/index`);
const express = require("express");

const {
    getAllTreasures,
} = require(`${__dirname}/controllers/treasures.controller.js`);

const app = express();
app.use(express.json());

app.get("/api/treasures", getAllTreasures);

module.exports = app;
