const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
dbConnect();

app.use(express.json());

//Import routes
const user = require("./routes/userRoute");
const url = require("./routes/urlRoute");

app.use("/api/v1", user);
app.use("/api/v1", url);

app.listen(process.env.PORT || 8001, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${process.env.PORT}`);
});
