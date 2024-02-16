const {
	selectAllTreasures,
} = require(`${__dirname}/../models/treasures.model`);

exports.getAllTreasures = (req, res, next) => {
	let { sort_by, colour, order } = req.query;
	selectAllTreasures(sort_by, colour, order ? order.toUpperCase() : order)
		.then((dbRes) => {
			const data = dbRes.rows;
			res.status(200).send({ treasures: data });
		})
		.catch((error) => {
			next(error);
		});
};
