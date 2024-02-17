const db = require(`${__dirname}/../db`);

exports.selectAllTreasures = (sort_by = "age", order = "ASC", filters) => {
    // INJECTED VAR MANAGEMENT
    let injectedVariables = [];

    // SORTING
    const validSortOptions = ["treasure_name", "age", "cost_at_auction"];

    if (!validSortOptions.includes(sort_by)) {
        throw { status: 400, msg: "Invalid sort query" };
    }

    // ORDERING
    order = order.toUpperCase();

    if (order !== "ASC" && order !== "DESC") {
        throw { status: 400, msg: "Invalid order query" };
    }

    // FILTERING
    for (const nameOfFilter in filters) {
        if (filters[nameOfFilter] === undefined) {
            delete filters[nameOfFilter];
        }
    }

    const filterClauses = Object.keys(filters).reduce(
        (stringOfWheres, nameOfCurrFilter, iOfFilter) => {
            const filterValues = filters[nameOfCurrFilter];
            let filterClause = "";
            filterValues.forEach((value, iOfValue) => {
                injectedVariables.push(value);
                filterClause += `${
                    iOfValue ? "OR" : ""
                } treasures.${nameOfCurrFilter} = $${
                    injectedVariables.length
                } `;
            });
            return iOfFilter ? "AND" : "" + stringOfWheres + filterClause;
        },
        ""
    );

    // DB QUERY
    return db
        .query(
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
    ${filterClauses ? `WHERE ${filterClauses}` : ""}
    ORDER BY treasures.${sort_by} ${order}
    
`,
            injectedVariables
        )
        .then((result) => result.rows);
};
