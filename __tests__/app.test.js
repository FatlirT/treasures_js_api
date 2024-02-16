const request = require("supertest");
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
    });
});

afterAll(() => {
    db.end();
});
