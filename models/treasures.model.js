const db = require(`${__dirname}/../db`);

exports.selectAllTreasures = (sort_by = "age") => {
    const validColumns = [
        "treasure_id",
        "treasure_name",
        "colour",
        "age",
        "cost_at_auction",
        "shop_name",
    ];

    if (!validColumns.includes(sort_by)) {
        throw { status: 400, msg: "Invalid order query" };
    }

    return db.query(
        `
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
        shops ON treasures.shop_id = shops.shop_id
    ORDER BY treasures.${sort_by} ASC
`
    );
};
