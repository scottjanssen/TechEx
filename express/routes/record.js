const express = require("express");
const fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs")
 
// mapRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const mapRoutes = express();
mapRoutes.use(express.json());
const dbo = require("../db/conn");
let db_connect = dbo.getDb("main");

const model = await tf.loadLayersModel("../resources/pred_model_tfjs/model.json")

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

mapRoutes.route("/timeseries/:begin/:end/:base").get(function (req, res) {


    let myHeaders = new fetch.Headers();
    myHeaders.append("apikey", "JJXPliIH6gNEAjqcBYUvkUYl9bqyEAcH");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    let key = "JJXPliIH6gNEAjqcBYUvkUYl9bqyEAcH";
    let result1;
    let rates_array;
    if (rounded_today > saved_end) {
        let new_start = (saved_end + 86400000);
        let ns_date = new_start.toJSON().slice(0, 10);
        fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${ns_date}&end_date=${currentDate}&base=${req.params.base}&apikey=${key}`, requestOptions).then(response => response.json()).then(async result => {
            //One large chunk date = one call? or not?
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
    }
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