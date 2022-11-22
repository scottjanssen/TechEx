const express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");
const tf = require("@tensorflow/tfjs")
 
// mapRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const mapRoutes = express();
mapRoutes.use(express.json());

const dbo = require("../db/conn");
const db_connect = dbo.getDb();

const BASE = 'USD'
const BEGINNING = '1999-01-01'
const API_KEY = 'YknABlU4L9jZ3e7azGRzR71EHuvjxjuT'

// const model = await tf.loadLayersModel("../resources/pred_model_tfjs/model.json")

const getDateStr = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const getToday = (minusT=0) => {
    const date = new Date();
    date.setDate(date.getDate() - minusT)
    return getDateStr(date)
}

// updates the entire database to recent rates
mapRoutes.get('/api/historical/', (req, res) => {
    const dbConnect = dbo.getDb();
    let today = getToday()

    dbConnect.collection('historical')
        .find()
        .sort({ date: -1 })
        .limit(1)
        .toArray()
        .then((data) => {
            if (data.length == 0) data = [{date: BEGINNING}]
            if (data[0].date < today) {
                let latest = data[0].date
                let [year, ...rest] = latest.split('-')

                // console.log('not updated')
                // console.log(latest, today)


                let i = 1
                while (latest < today) {
                    let next_date = (+year + i).toString() + '-' + rest.join('-')
                    let next_latest = new Date(next_date)
                    next_latest.setDate(next_latest.getDate() - 1)
                    next_latest = getDateStr(next_latest)
                    if (today < next_latest) next_latest = today

                    // console.log(latest, next_latest)

                    axios.get(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${latest}&end_date=${next_latest}&base=${BASE}&apikey=${API_KEY}`,
                            { headers: { redirect: 'follow', apikey: API_KEY } })
                        .then((result) => {
                            // console.log('...fetched')
                            let new_data = result.data.rates
                            Object.keys(new_data).forEach((date) => {
                                dbConnect.collection('historical').insertOne({
                                    date: date,
                                    ...new_data[date]
                                })
                            })
                            // console.log('...uploaded')
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    latest = next_date
                    i++
                }
            }
            res.json(true)
        })
        .catch((err) => {
            console.log(err)
            res.json(false)
        })
})

// get one conversion value
mapRoutes.get('/api/get/:base/:target/:amount/', function (req, res) {
    const dbConnect = dbo.getDb();
    let today = getToday()

    dbConnect.collection('historical').findOne({ 'date': today })
        .then((data) => {
            if (data) {
                baseRate = +data[req.params.base]
                targetRate = +data[req.params.target]
                res.json(targetRate / baseRate * (+req.params.amount))
            } else {
                axios.get('/api/historical')
                    .then(() => {
                        dbConnect.collection('historical').findOne({ 'date': today })
                            .then((data) => {
                                baseRate = +data[req.params.base]
                                targetRate = +data[req.params.target]
                                res.json(targetRate / baseRate * (+req.params.amount))
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.json(false)
                    })
            }
        })
})

// get complete historical data that exists
mapRoutes.get('/api/historical/:base/:target/', (req, res) => {
    const dbConnect = dbo.getDb();

    let query = {}
    query[req.params.base] = {
        $exists: true
    }
    query[req.params.target] = {
        $exists: true
    }

    let proj = { _id: 0, date: 1 }
    proj[req.params.base] = 1
    proj[req.params.target] = 1

    dbConnect.collection('historical').find(query)
        .project(proj)
        .sort({ date: 1 })
        .toArray()
        .then((data) => {
            // console.log(data.length)
            res.json(data.map((d) => {
                return {
                    date: d.date,
                    rate: (+d[req.params.target]) / (+d[req.params.base])
                }
            }))
        })
})

mapRoutes.get('/api/quarter/:base/:target/', (req, res) => {
    const dbConnect = dbo.getDb();
    let pastQuarter = getToday(90)
    // console.log(pastQuarter)

    let query = { date: { $gt: pastQuarter } }
    query[req.params.base] = {
        $exists: true
    }
    query[req.params.target] = {
        $exists: true
    }

    let proj = { _id: 0, date: 1 }
    proj[req.params.base] = 1
    proj[req.params.target] = 1


    // console.log(proj)
    dbConnect.collection('historical').find(query)
        .project(proj)
        .sort({ date: 1 })
        .toArray()
        .then((data) => {
            res.json(data.map((d) => {
                return {
                    date: d.date,
                    rate: (+d[req.params.target]) / (+d[req.params.base])
                }
            }))
        })
})

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