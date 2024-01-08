const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
dbConnect();

app.use(express.json());


app.listen(process.env.PORT || 8001, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${process.env.PORT}`);
});
