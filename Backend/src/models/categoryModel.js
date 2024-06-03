const mongoose=require("mongoose")

const cateSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:50
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    level:{
        type:Number,
        required:true
    }
})

const Category = new mongoose.model("categories",cateSchema)

module.exports=Category;