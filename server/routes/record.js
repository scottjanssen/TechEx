const express = require("express");
 
// mapRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const mapRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Dependencies for parsing gpx data in to geojson data for maps
const fs = require("fs");
const geoJson = require('togeojson');
const DOMParser = require('xmldom').DOMParser;

let db_connect = dbo.getDb("main");
 
// This converts our example gpx file to geojson, prints it to console, and adds one entry to the db collection
mapRoutes.route("/data").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  const gpx = new DOMParser().parseFromString(fs.readFileSync('test.gpx', 'utf-8'));

  const toReturn = geoJson.gpx(gpx);
  // Prints the parsed gpx data in geojson format to console
  console.log(geoJson.gpx(gpx).features[0].geometry);
  
  // Adding a dummy value to our time series collection to test
  /*db_connect.collection("scenrioName").insertOne({
    "metadata": { "sensorId": 5578, "type": "temperature" },
    "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
    "temp": 12
  })*/
    res.json(toReturn);
    res.end();
});

// This is another test for time series data collection of adding a few items
mapRoutes.route("/data/test").get(function (req, res) {
  let db_connect = dbo.getDb("main");
  const gpx = new DOMParser().parseFromString(fs.readFileSync('test.gpx', 'utf-8'));
  
  // Adding dummy values to our time series collection to test
  db_connect.collection("scenrioName").insertMany( [
    {
       "metadata": { "sensorId": 5578, "type": "temperature" },
       "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
       "temp": 12
    },
    {
       "metadata": { "sensorId": 5578, "type": "temperature" },
       "timestamp": ISODate("2021-05-18T04:00:00.000Z"),
       "temp": 11
    },
    {
       "metadata": { "sensorId": 5578, "type": "temperature" },
       "timestamp": ISODate("2021-05-18T08:00:00.000Z"),
       "temp": 11
    },
    {
       "metadata": { "sensorId": 5578, "type": "temperature" },
       "timestamp": ISODate("2021-05-18T12:00:00.000Z"),
       "temp": 12
    },
    {
       "metadata": { "sensorId": 5578, "type": "temperature" },
       "timestamp": ISODate("2021-05-18T16:00:00.000Z"),
       "temp": 16
    }
  ] )
});
 
// This retrieves a single data point by timestamp in the collection
mapRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb("main");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("scenarioName")
   .findOne({
    "timestamp": ISODate("2021-05-18T00:00:00.000Z")
 })
});
 
// This section will help you update a time series doc by date
mapRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb("main");
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("scenarioName")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This deletes a document from the time series collection
mapRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb("main");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("scenarioName").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = mapRoutes;