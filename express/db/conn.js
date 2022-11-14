const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db)
            {
                _db = db.db("main");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    startFetch: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (err) return callback(err);
            _db = db.db("main");
            _db.collection("historical").find({}).toArray(function(err, result) {
                if (err) return callback(err);
                //We can do stuff here
                console.log(result);
            });
        });
    },

    getDb: function () {
        return _db;
    },
}