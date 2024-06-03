const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    cartItems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cartItems",
        required:true
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalItems:{
        type:Number,
        default:0,
        required:true
    },
    totalDiscountedPrice:{
        type:Number,
        default:0,
        required:true
    },
    discount:{
        type:Number,
        default:0,
        required:true
    },
})

const Cart=new mongoose.model("cart",cartSchema)

module.exports=Cart