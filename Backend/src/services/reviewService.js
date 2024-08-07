const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const productService = require("../services/productService")

// const createReview = async(reqData,user)=>{
//     const product = await productService.findProductById(reqData.productId);

//     const review = new Review({
//         user:user._id,
//         review:reqData.review,
//         product:product._id,
//         createdAt:new Date()
//     })

//     await product.save()
//     return await review.save()   
// }

const createReview = async (reqData, user) => {
    const review = new Review({
        user: user._id,
        review: reqData.review,
        product: reqData.productId,
        createdAt: new Date()
    });

    await review.save();
    
    await Product.findByIdAndUpdate(
        reqData.productId,
        { $push: { reviews: review._id } },
        { new: true }
    );

    
    await User.findByIdAndUpdate(
        user._id,
        { $push: { reviews: review._id } },
        { new: true }
    );

    return review;
};


const getAllReview=async(prodId)=>{
    const product = await productService.findProductById(prodId);

    return await Review.find({product:product._id}).populate("user")

}

module.exports={
    createReview,
    getAllReview
}