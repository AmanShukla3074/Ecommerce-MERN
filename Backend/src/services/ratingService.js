const Rating = require("../models/ratingModel");
const productService = require("../services/productService")

const creatingRating=async(req,user)=>{
    const product = await productService.findProductById(req.productId);

    const rating = new Rating({
        user:user._id,
        ratings:req.ratings,
        product:product._id,
        createdAt:new Date()
    })

    return await rating.save() 
}


const getProductRating=async(prodId)=>{
    const product = await productService.findProductById(prodId);

    return await Rating.find({product:product._id}).populate("user")
}

module.exports={
    creatingRating,
    getProductRating    
}