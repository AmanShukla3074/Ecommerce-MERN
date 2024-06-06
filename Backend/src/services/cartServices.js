const Cart=require("../models/cartModel")

async function createCart(user) {
    try {
        const cart = new Cart({
            user,
            // cartItems: [] // Initialize with an empty array
        });
        const createdCart = await cart.save();
        console.log("Created Cart:", createdCart);
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

// async function createCart(user){
//     try {
//         const cart=new Cart({user,cartItems: []})
//         const createdCart=await cart.save()
//         console.log("aa",createCart);
//         return createdCart
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

// const createCart = async(user)=>{
//     try {
//         const cart=new Cart({user})
//         const createdCart=await cart.save()
    
//         return createdCart
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

module.exports={createCart}