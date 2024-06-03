const mongoose=required("mongoose")

const orderItemsSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true,
    }
})