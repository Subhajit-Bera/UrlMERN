const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    });

    
}

module.exports = dbConnect;