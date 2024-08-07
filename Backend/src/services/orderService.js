const OrderItem = require("../models/orderItems");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const cartService = require("../services/cartService");
const Razorpay = require("razorpay");

const dotenv=require("dotenv").config();

// const createOrder = async (user, shippingAddress) => {

//   const isAddressExist = user.address.includes(shippingAddress._id);

//   if (!isAddressExist) {
//     // If the address is not in the user's address array, add it
//     user.address.push(shippingAddress._id);
//     await user.save();
//   }

//   const cart = await cartService.findUserCart(user._id);
//   const orderItems = [];

//   for (const item of cart.cartItems) {
//      const product = await Product.findById(item.product);

//      const sizeIndex = product.sizes.findIndex(size => size.name === item.size);
//      if (sizeIndex !== -1) {
//        product.sizes[sizeIndex].quantity -= item.quantity;
//        if (product.sizes[sizeIndex].quantity < 0) {
//          throw new Error(`Not enough stock for product ${product.title} in size ${item.size}`);
//        }
//      } else {
//        throw new Error(`Size ${item.size} not found for product ${product.title}`);
//      }
 
//      await product.save();

//     const orderItem = new OrderItem ({
//       product: item.product,
//       size: item.size,
//       quantity: item.quantity,
//       price: item.price,
//       discountedPrice: item.discountedPrice,
//       userId: item.userId,
//     });

//     const createOrderItem = await orderItem.save();
//     orderItems.push(createOrderItem);
//   }

//   const createdOrder = new Order({
//     user,
//     orderItems,
//     totalPrice: cart.totalPrice,
//     totalDiscountedPrice: cart.totalDiscountedPrice,
//     discount: cart.discount,
//     totalItem: cart.totalItems,
//     shippingAddress: shippingAddress._id,
//   });

//   const savedOrder = await createdOrder.save();
//   const clearCart=await cartService.clearUserCart(user._id)
//   return savedOrder;
// };

const createRazorpayOrder = async (totalPrice) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const razorpayOrder = await instance.orders.create({
    amount: totalPrice * 100, // Amount in paise
    currency: "INR",
  });

  return razorpayOrder;
};
const createOrder = async (user,  shippingAddress , razorpayOrderId) => {
  const cart = await cartService.findUserCart(user._id);
  if (!cart || cart.cartItems.length === 0) {
    return res.status(400).send({ error: "Your cart is empty" });
  }
  const orderItems = [];

  for (const item of cart.cartItems) {
      const productExists = await Product.exists({ _id: item.product });
      if (!productExists) {
          throw new Error(`Product with ID ${item.product} does not exist.`);
      }

      const orderItem = new OrderItem({
          product: item.product, 
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          discountedPrice: item.discountedPrice,
          userId: user._id,
      });

      const savedOrderItem = await orderItem.save();
      orderItems.push(savedOrderItem._id); 
  }

  const newOrder = new Order({
      user: user._id,
      orderItems, 
      shippingAddress: shippingAddress,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discount,
      totalItem: cart.totalItems,
      paymentDetails: {
          paymentMethod: 'RAZORPAY',
          transactionId: razorpayOrderId,
          paymentStatus: "PENDING",
      },
  });

  await newOrder.save();
  await cartService.clearUserCart(user._id);
  return newOrder;
};



// const createRazorpayOrder = async (totalPrice) => {
//   const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });

//   const razorpayOrder = await instance.orders.create({
//     amount: totalPrice * 100, // Amount in paise
//     currency: "INR",
//   });

//   return razorpayOrder;
// };

// const createOrder = async (user, { shippingAddress, orderItems, totalPrice }, paymentId) => {
//   const isAddressExist = user.address.includes(shippingAddress._id);

//   if (!isAddressExist) {
//     user.address.push(shippingAddress._id);
//     await user.save();
//   }

//   for (const item of orderItems) {
//     const product = await Product.findById(item.product);

//     const sizeIndex = product.sizes.findIndex(size => size.name === item.size);
//     if (sizeIndex !== -1) {
//       product.sizes[sizeIndex].quantity -= item.quantity;
//       if (product.sizes[sizeIndex].quantity < 0) {
//         throw new Error(`Not enough stock for product ${product.title} in size ${item.size}`);
//       }
//     } else {
//       throw new Error(`Size ${item.size} not found for product ${product.title}`);
//     }

//     await product.save();

//     const orderItem = new OrderItem({
//       product: item.product,
//       size: item.size,
//       quantity: item.quantity,
//       price: item.price,
//       discountedPrice: item.discountedPrice,
//       userId: item.userId,
//     });

//     await orderItem.save();
//   }

//   const createdOrder = new Order({
//     user: user._id,
//     orderItems,
//     totalPrice,
//     totalDiscountedPrice: totalPrice, // Adjust accordingly
//     discount: 0, // Adjust accordingly
//     totalItem: orderItems.length,
//     shippingAddress: shippingAddress._id,
//     "paymentDetails.transactionId": paymentId,
//     "paymentDetails.paymentStatus": "SUCCESS",
//   });

//   const savedOrder = await createdOrder.save();
//   await cartService.clearUserCart(user._id);
//   return savedOrder;
// };


const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.paymentStatus = "COMPLETED";

  return await order.save();
};

const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";

  return await order.save();
};

const shipOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
};

const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
};

const cancelOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
};

// const findOrderById = async (orderId) => {
//   const order = await Order.findById(orderId)
//     .populate("user")
//     .populate({ path: "orderItems", populate: { path: "product" } })
//     .populate("shippingAddress");

//   return order;
// };

// const findOrderById = async (orderId) => {
//   const order = await Order.findById(orderId)
//     .populate("user", "-password -__v") // Exclude sensitive user info
//     .populate({
//       path: "orderItems",
//       populate: {
//         path: "product",
//         model: "products", // Specify the correct model name
//       }
//     })
//     .populate("shippingAddress");

//   return order;
// };

const findOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
    .populate("user", "-password -__v")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "products",
      }
    })
    .populate("shippingAddress")

    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Error finding order:", error.message); // Log error details
    throw new Error("Failed to fetch order details");
  }
};


const userOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({
      user: userId,
      // orderStatus: "PLACED",
    }).populate({ path: "orderItems", populate: { path: "product" } }).populate("shippingAddress")

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrder = async (userId) => {
  try {
    return await Order.find()
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  userOrderHistory,
  getAllOrder,
  deleteOrder,
  createRazorpayOrder
};
