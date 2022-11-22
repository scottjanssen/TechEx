const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const axios = require("axios");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

app.use(require("./routes/record"));
const dbo = require("./db/conn");

app.listen(port, () => {

    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });

    // dbo.reloadJSON(function (err) {
    //     if (err) console.error(err);
    // });
/*
    dbo.startFetch(function (err) {
        if (err) console.error(err);
    });
*/
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;