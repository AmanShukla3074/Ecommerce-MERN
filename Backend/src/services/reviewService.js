const Review = require("../models/reviewModel");
const productService = require("../services/productService")

const createReview = async(reqData,user)=>{
    const product = await productService.findProductById(reqData.productId);

    const review = new Review({
        user:user._id,
        review:reqData.review,
        product:product._id,
        createdAt:new Date()
    })

    await product.save()
    return await review.save()   
}

const getAllReview=async(prodId)=>{
    const product = await productService.findProductById(prodId);

    return await Review.find({product:product._id}).populate("user")

}

module.exports={
    createReview,
    getAllReview
}