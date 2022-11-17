const express = require("express");
const fetch = require("node-fetch");
 
// mapRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const mapRoutes = express();
mapRoutes.use(express.json());
const dbo = require("../db/conn");
let db_connect = dbo.getDb("main");

mapRoutes.get("/convert/:to/:from/:amount", function (req, res) {

    let myHeaders = new fetch.Headers();
    myHeaders.append("apikey", "JJXPliIH6gNEAjqcBYUvkUYl9bqyEAcH");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    let key = "JJXPliIH6gNEAjqcBYUvkUYl9bqyEAcH";
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${req.params.to}&from=${req.params.from}&amount=${req.params.amount}&apikey=${key}`, requestOptions).then(response => response.json()).then(result => res.json(result));
});

mapRoutes.get("/timeseries/:begin/:end/:base", function (req, res) {


    let myHeaders = new fetch.Headers();
    myHeaders.append("apikey", "JJXPliIH6gNEAjqcBYUvkUYl9bqyEAcH");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    let key = "JJXPliIH6gNEAjqcBYUvkUYl9bqyEAcH";
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


 
module.exports = mapRoutes;