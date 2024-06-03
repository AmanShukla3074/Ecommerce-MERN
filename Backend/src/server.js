const app = require(".");
const { connectDB } = require("./config/db");

const dotenv=require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT,async()=>{
    await connectDB();
    console.log("Server Running on PORT: ",PORT)
})