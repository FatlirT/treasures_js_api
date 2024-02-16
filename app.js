const db = require(`${__dirname}/db/index`);
const express = require("express");

const {
    getAllTreasures,
} = require(`${__dirname}/controllers/treasures.controller.js`);

const app = express();
app.use(express.json());

app.get("/api/treasures", getAllTreasures);

app.all("/*", (req, res, next) => {});

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "bad request" });
    }
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Server Error!");
});

module.exports = app;
