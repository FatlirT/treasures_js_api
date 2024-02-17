const express = require("express");
const {
    getAllTreasures,
} = require(`${__dirname}/controllers/treasures.controller.js`);

const app = express();
app.use(express.json());

app.get("/api/treasures", getAllTreasures);

app.all("/:invalid_endpoint", (req, res, next) => {
    const invalid_endpoint = req.params.invalid_endpoint;
    next({ status: 404, msg: `${invalid_endpoint} endpoint doesn't exist` });
});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
});

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
    } else next(err);
});

app.use((err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
