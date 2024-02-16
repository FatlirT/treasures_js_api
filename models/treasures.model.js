const db = require(`${__dirname}/../db`);
exports.selectAllTreasures = () => {
    return db.query(`
    SELECT
        treasures.treasure_id,
        treasures.treasure_name,
        treasures.colour,
        treasures.age,
        treasures.cost_at_auction,
        shops.shop_name
    FROM
        treasures
    JOIN
        shops ON treasures.shop_id = shops.shop_id;
`);
};
