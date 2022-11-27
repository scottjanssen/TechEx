const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

var _db;

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(Db, function(err, client) {
            // Verify we got a good "db" object
            if (client)
            {
                _db = client.db("main");
                // _db.collection('historical').deleteMany()
                _db.collection('historical').createIndex({ date: 1 }, { unique: true })
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    reloadJSON: function (callback) {
        MongoClient.connect(Db, function(err, db) {
            // Verify we got a good "db" object
            if (err) return callback(err);
            _db = db.db("main");
            _db.collection("historical").deleteMany ( { } );

            const fs = require('fs');
            const path = require("path");
            let rawdata = fs.readFileSync(path.resolve(__dirname, "E:/GitHub/CS3300/Project2/express/routes/raw_data2.json"));
            let raw_array = JSON.parse(rawdata);
            let test_array = Object.keys(raw_array[0].rates);

            //console.log(Object.keys(raw_array[0].rates)[0]);
            /*
            for (let i in test_array) {
                console.log(test_array[i]);
            }
             */


            for (let i in raw_array) {
                let rates_array = raw_array[i].rates;
                let keys_array = Object.keys(rates_array);
                let val_array = Object.values(rates_array);
                for (let j in keys_array) {
                    // console.log(keys_array[j]);
                    // console.log(val_array[j]);
                    // console.log(new Date(Object.keys(rates_array)[j]));
                    _db.collection("historical").insertOne({
                        "date": Object.keys(rates_array)[j],
                        "rates": Object.values(rates_array)[j],
                        "sortDate": new Date(Object.keys(rates_array)[j]),
                        "base": raw_array[i].base,
                    });
                }
            }
        });
    },

    startFetch: function (callback) {
        MongoClient.connect(Db, function(err, db) {
            // Verify we got a good "db" object
            if (err) return callback(err);
            _db = db.db("main");
            _db.collection("historical").aggregate(
                [
                    { $sort : { _id: 1 } }
                ]
            )

            // _db.collection("historical").find({}).toArray(function(err, result) {
            //     if (err) return callback(err);
            //     //We can do stuff here
            //     //console.log(result);
            // });
            // console.log("Sorted");
        });
    },

    getDb: function () {
        return _db;
    },
}