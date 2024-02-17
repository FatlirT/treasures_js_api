const request = require("supertest");
require("../env")
const db = require("../db");
const app = require("../app");

const seed = require("../db/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

describe("invalid_endpoint", () => {
    test("GET /:invalid_endpoint", () => {
        return request(app)
            .get("/djsadisaojs")
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe("djsadisaojs endpoint doesn't exist");
            });
    });
});

describe("treasures", () => {
    describe("GET /api/treasures", () => {
        test("should return 200 OK", () => {
            return request(app).get("/api/treasures").expect(200);
        });
        test("should return an Array of treasure objects", () => {
            return request(app)
                .get("/api/treasures")
                .expect(200)
                .then((res) => {
                    expect(res.body).toHaveProperty("treasures");
                    expect(Array.isArray(res.body.treasures)).toBe(true);
                });
        });
        test("should return treasure objects with the expected properties", () => {
            return request(app)
                .get("/api/treasures")
                .expect(200)
                .then((res) => {
                    const props = [
                        "treasure_id",
                        "treasure_name",
                        "colour",
                        "age",
                        "cost_at_auction",
                        "shop_name",
                    ];
                    props.forEach((prop) =>
                        expect(res.body.treasures[0]).toHaveProperty(prop)
                    );
                });
        });
        test("should return an Array of treasure objects sorted by property Age Ascending by Default", () => {
            return request(app)
                .get("/api/treasures")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;
                    expect(treasures).toBeSortedBy("age");
                });
        });
        test("should return an Array of treasure objects sorted by property passed in as 'sort_by' query", () => {
            return request(app)
                .get("/api/treasures?sort_by=cost_at_auction")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;
                    expect(treasures).toBeSortedBy("cost_at_auction");
                });
        });
        test("should return 400 when 'sort_by' is an invalid value", () => {
            return request(app)
                .get("/api/treasures?sort_by=forklift")
                .expect(400);
        });
        test("should be sorted by ASC by default", () => {
            return request(app)
                .get("/api/treasures?sort_by=cost_at_auction")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;
                    expect(treasures).toBeSortedBy("cost_at_auction", {
                        descending: false,
                        // coerce: true,
                    });
                });
        });
        test("should be sorted by DESC when order query is set to desc", () => {
            return request(app)
                .get("/api/treasures?sort_by=treasure_name&order=desc")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;
                    expect(treasures).toBeSortedBy("treasure_name", {
                        descending: true,
                        // coerce: true,
                    });
                });
        });
        test("should filter out the treasures by colour", () => {
            return request(app)
                .get("/api/treasures?colour=gold")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;

                    expect(
                        treasures.every(
                            (treasure) =>
                                treasure.colour === "gold"
                        )
                    ).toBe(true);
                });
        });
        test("should filter out the treasures by colour with multiple possible values", () => {
            return request(app)
                .get("/api/treasures?colour=gold%2Csilver")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;

                    expect(
                        treasures.every(
                            (treasure) =>
                                treasure.colour === "gold" ||
                                treasure.colour === "silver"
                        )
                    ).toBe(true);
                });
        });
        test("should return 200, and an  array in the body, for an invalid 'colour'", () => {
            return request(app)
                .get("/api/treasures?colour=forklift")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;

                    expect(treasures).toEqual([]);
                });
        });
        test("should return 200, and all treasures in the body when colour isn't passed in", () => {
            return request(app)
                .get("/api/treasures")
                .expect(200)
                .then((res) => {
                    const {
                        body: { treasures },
                    } = res;

                    expect(treasures.length).toBe(26);
                });
        });
    });
});
afterAll(() => {
    db.end();
});
