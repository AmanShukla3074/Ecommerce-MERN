const Product = require("../models/productModel");
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");
const productService = require("../services/productService")

// const creatingRating=async(req,user)=>{
//     const product = await productService.findProductById(req.productId);

//     const rating = new Rating({
//         user:user._id,
//         ratings:req.ratings,
//         product:product._id,
//         createdAt:new Date()
//     })

//     return await rating.save() 
// }

const creatingRating = async (req, user) => {
    
    const rating = new Rating({
        user: user._id,
        ratings: req.ratings,
        product: req.productId,
        createdAt: new Date()
    });

    await rating.save();

    await Product.findByIdAndUpdate(
        req.productId,
        { $push: { ratings: rating._id } },
        { new: true }
    );

    await User.findByIdAndUpdate(
        user._id,
        { $push: { ratings: rating._id } },
        { new: true }
    );

    return rating;
};


const getProductRating=async(prodId)=>{
    const product = await productService.findProductById(prodId);

    return await Rating.find({product:product._id}).populate("user")
}

module.exports={
    creatingRating,
    getProductRating    
}