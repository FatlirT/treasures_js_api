exports.getAllTreasures = (req, res) => {
    return res.status(200).send({
        treasures: [
            {
                treasure_name: "treasure-f",
                colour: "onyx",
                age: 56,
                cost_at_auction: "0.01",
                shop: "shop-e",
            },
        ],
    });
};
