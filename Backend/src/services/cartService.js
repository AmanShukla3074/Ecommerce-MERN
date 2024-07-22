const CartItems=require("../models/cartItemModel");
const Cart = require("../models/cartModel");
const Product=require("../models/productModel")


const createCart = async(user)=>{    
    try {
        const cart = new Cart({
            user,
            cartItems: [] // Initialize with an empty array
        });
        const createdCart = await cart.save();
        console.log("Created Cart:", createdCart);
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserCart=async(userId)=>{
    try {
        let cart=await Cart.findOne({user:userId})
        let cartItems=await CartItems.find({cart:cart._id}).populate("product");

        cart.cartItems=cartItems;

        let totalPrice=0;
        let totalItems = 0;
        let totalDiscountedPrice = 0;

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.price;
            totalItems+=cartItem.quantity;
            totalDiscountedPrice+=cartItem.discountedPrice; 
        }

        cart.totalPrice=totalPrice
        cart.totalItems=totalItems
        cart.discount=totalPrice-totalDiscountedPrice;

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

const addCartItem=async(userId,req)=>{
    const cart=await Cart.findOne({user:userId});
    const product=await Product.findById(req.productId);
    
    const isPresent=await CartItems.findOne({cart:cart._id,product:product._id,userId});
    if(!isPresent){
        const cartItem=new CartItems({
            cart:cart._id,
            product:product._id,
            size:req.size,
            quantity:1,
            price:product.price, 
            discountedPrice:product.discountedPrice,    
            userId
        })
        const createdCartItem=await cartItem.save()
        cart.cartItems.push(createdCartItem)
        await cart.save()
        return "Item added to cart";
    }
}

module.exports={createCart,findUserCart,addCartItem}