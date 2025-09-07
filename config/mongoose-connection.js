const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
// ye development ke naam se mongoose ka sare data use kar rahe hai

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function() {
    dbgr("DataBase connected");
    // console.log("Database connected");
    // l=config.get("MONGODB_URI");
    // console.log(l);
})
.catch(function(err) {
    console.error("❌ Mongoose connection failed:", err.message);
    dbgr("Mongoose connection failed:", err);
})


module.exports = mongoose.connection;
// use // set DEBUG=development:* // to set debug then run the app
