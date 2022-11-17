const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


describe("Convert Tests", () => {
    test("GET /convert Euro to USD", async () => {
        const response = await request(app).get("/convert/EUR/USD/5").send()
        expect(response.statusCode).toBe(200);
    });
    test("GET /convert USD to Euro", async () => {
        const response = await request(app).get("/convert/USD/EURO/25").send()
        expect(response.statusCode).toBe(200);
    });

});

describe("Convert Tests", () => {
    test("GET Historical USD 1", async () => {
        const response = await request(app).get("/timeseries/2012-05-01/2012-05-05/USD").send()
        expect(response.statusCode).toBe(200);
    });
    test("GET Historical USD 2", async () => {
        const response = await request(app).get("/timeseries/2017-11-05/2017-11-08/USD").send()
        expect(response.statusCode).toBe(200);
    });
});
