const {
    selectAllTreasures,
} = require(`${__dirname}/../models/treasures.model`);

exports.getAllTreasures = (req, res, next) => {
    const sort_by = req.query.sort_by;
    selectAllTreasures(sort_by)
        .then((dbRes) => {
            const data = dbRes.rows;
            res.status(200).send({ treasures: data });
        })
        .catch((error) => {
            next(error);
        });
};
