const request = require("supertest");
const db = require("../db");
const app = require("../app");

const seed = require("../db/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

describe("treasures", () => {
    describe("GET /api/treasures", () => {
        test("should return 200 OK when there is treasures", () => {
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
                        "treasure_name",
                        "colour",
                        "age",
                        "cost_at_auction",
                        "shop",
                    ];
                    props.forEach((prop) =>
                        expect(res.body.treasures[0]).toHaveProperty(prop)
                    );
                });
            // treasure_name;
            // colour;
            // age;
            // cost_at_auction;
            // shop;
        });
        test("should return an Array of treasure objects sorted by property Age Ascending", () => {
            // second;
        });
    });
});

afterAll(() => {
    db.end();
});
