const mongoose  = require("mongoose")
const dotenv=require("dotenv").config();

const URI = process.env.URI;
``
const connectDB=()=>{
    return mongoose.connect(URI);
}

module.exports={connectDB}