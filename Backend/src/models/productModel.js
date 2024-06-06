const mongoose= require("mongoose")

const productSchema=new mongoose.Schema({
    titel:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
    },
    discountPercent:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true
    },
    sizes:[{
        name:{
            type:String,
        },
        quantity:{
            type:Number,
        },
    }],
    imgUrl:{
        type:String,
    },
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }],
    numRating:{
        type:Number,
        default:Number
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Product=mongoose.model("products",productSchema);

module.exports=Product;