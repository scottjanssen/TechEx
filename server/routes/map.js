const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const mapRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const fs = require("fs");
const geoJson = require('togeojson');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const DOMParser = require('xmldom').DOMParser;


// This section will help you get a list of all the records.
mapRoutes.route("/data").get(function (req, res) {
    let db_connect = dbo.getDb("main");
    const gpx = new DOMParser().parseFromString(fs.readFileSync('test.gpx', 'utf-8'));
    console.log(geoJson.gpx(gpx).features[0].geometry);
});


module.exports = mapRoutes;