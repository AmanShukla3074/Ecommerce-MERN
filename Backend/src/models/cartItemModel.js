const mongoose=require("mongoose")

const cartItemsSchema=new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },
    size:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:true
    },
    price:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const CartItems=new mongoose.models("cartItems",cartItemsSchema)

module.exports=CartItems;