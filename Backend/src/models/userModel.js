const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    role:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    mobile:{
        type:String
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    paymentInformation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_information"
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }],
    otp: {
        type: String,
        required: false
    },
    otpExpires: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      verified: {
        type: Boolean,
        default: false,
      },
})

const User = mongoose.model("users",userSchema);
module.exports=User;