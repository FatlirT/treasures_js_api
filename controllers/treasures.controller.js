const {
    selectAllTreasures,
} = require(`${__dirname}/../models/treasures.model`);

exports.getAllTreasures = (req, res, next) => {
    const { sort_by, order, ...filters } = req.query;
    // format filter values into Array
    for (const filterName in filters) {
        filters[filterName] = filters[filterName].split(",");
    }
    selectAllTreasures(sort_by, order, filters)
        .then((dbRes) => {
            const data = dbRes.rows
            res.status(200).send({ treasures: data });
        })
        .catch((error) => {
            next(error);
        });
};
