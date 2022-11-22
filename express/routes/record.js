const express = require("express");
const fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs")
 
// mapRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const mapRoutes = express.Router();
const dbo = require("../db/conn");
let db_connect = dbo.getDb("main");

const model = await tf.loadLayersModel("../resources/pred_model_tfjs/model.json")

mapRoutes.route("/convert/:to/:from/:amount").get(function (req, res) {

    let myHeaders = new fetch.Headers();
    myHeaders.append("apikey", "IFt6YaCBh3agEYsLvFWDtZ6Sr2kWFKUG");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    let key = "IFt6YaCBh3agEYsLvFWDtZ6Sr2kWFKUG";

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${req.params.to}&from=${req.params.from}&amount=${req.params.amount}&apikey=${key}`, requestOptions).then(response => response.json()).then(result => res.json(result));
});

mapRoutes.route("/timeseries/:begin/:end/:base").get(function (req, res) {
    let myHeaders = new fetch.Headers();
    myHeaders.append("apikey", "IFt6YaCBh3agEYsLvFWDtZ6Sr2kWFKUG");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    let key = "IFt6YaCBh3agEYsLvFWDtZ6Sr2kWFKUG";
    let result1;
    let rates_array;
    fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${req.params.begin}&end_date=${req.params.end}&base=${req.params.base}&apikey=${key}`, requestOptions).then(response => response.json()).then(async result => {
        let db_connect = dbo.getDb("main");
        rates_array = result['rates'];
        for (let i in rates_array) {
            let found = await db_connect.collection("historical").find({"timeseries": i}).count();
            if (found === 0) {
                db_connect.collection("historical").insertOne({
                    "timeseries": i,
                    "rates": rates_array[i],
                    "base": result['base'],
                });
            }
        }
        res.json(rates_array);
    });
});

mapRoutes.route("/predict/:end/:base/:target").get((req, res) => {
    let end = req.params.end,
        base = req.params.base,
        target = req.params.target;

    console.log(end, base, target)

    res.json([{
        date: '2022-11-17',
        rate: '3.5'
    }])
})


 
module.exports = mapRoutes;