const CartItems = require("../models/cartItemModel");
const userService = require("../services/userService");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("cart item not found: ", cartItemId);
    }

    const user = await userService.findUserById(item.userId);

    if (!user) {
      throw new Error("user not found: ", userId);
    }
    
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// const removeCartItem = async (userId, cartItemId) => {
//   const cartItem = await findCartItemById(cartItemId);
//   const user = await userService.findUserById(userId);
//   if (user._id.toString() === cartItem.userId.toString()) {
//     await CartItems.findByIdAndDelete(cartItemId);
//   } else {
//     throw new Error("you can't delete this cart item");
//   }
// };

const removeCartItem = async (userId, cartItemId) => {
  try {
    const cartItem = await findCartItemById(cartItemId);
    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user._id.toString() === cartItem.userId.toString()) {
      await CartItems.findByIdAndDelete(cartItemId);
      console.log("Cart item deleted successfully");
    } else {
      throw new Error("You can't delete this cart item");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await CartItems.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("can't find this cart item");
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
