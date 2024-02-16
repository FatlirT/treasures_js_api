const {
    selectAllTreasures,
} = require(`${__dirname}/../models/treasures.model`);

exports.getAllTreasures = (req, res) => {
    selectAllTreasures()
        .then((dbRes) => {
            const data = dbRes.rows;
            data.sort((a, b) => a.age - b.age);
            res.status(200).send({ treasures: data });
        })
        .catch((error) => {
            next(error);
        });
};
