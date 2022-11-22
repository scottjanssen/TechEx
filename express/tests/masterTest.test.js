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
    test("GET conversion for CAD to USD", async () => {
        const response = await request(app).get("/api/get/CAD/USD/5").send()
        expect(response.statusCode).toBe(200);
    });
    test("GET conversion USD to Euro", async () => {
        const response = await request(app).get("/api/get/USD/EURO/25").send()
        expect(response.statusCode).toBe(200);
    });

});

describe("Historical Tests", () => {
    test("GET Historical CAD to USD", async () => {
        const response = await request(app).get("/api/historical/CAD/USD").send()
        expect(response.statusCode).toBe(200);
    });
    test("GET Historical USD to CAD", async () => {
        const response = await request(app).get("/api/historical/USD/CAD").send()
        expect(response.statusCode).toBe(200);
    });
});
