const mongoose=require("mongoose")


const addressSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zipcode:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
    
})

const Address=mongoose.model("address",addressSchema)

module.exports=Address;