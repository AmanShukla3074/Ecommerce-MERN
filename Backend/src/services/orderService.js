const Address = require("../models/addressModel");
const OrderItem = require("../models/orderItems");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const cartService = require("../services/cartService");

const createOrder = async (user, shippingAddress) => {

  const isAddressExist = user.address.includes(shippingAddress._id);

  if (!isAddressExist) {
    // If the address is not in the user's address array, add it
    user.address.push(shippingAddress._id);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
     const product = await Product.findById(item.product);

     const sizeIndex = product.sizes.findIndex(size => size.name === item.size);
     if (sizeIndex !== -1) {
       product.sizes[sizeIndex].quantity -= item.quantity;
       if (product.sizes[sizeIndex].quantity < 0) {
         throw new Error(`Not enough stock for product ${product.title} in size ${item.size}`);
       }
     } else {
       throw new Error(`Size ${item.size} not found for product ${product.title}`);
     }
 
     await product.save();

    const orderItem = new OrderItem ({
      product: item.product,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      discountedPrice: item.discountedPrice,
      userId: item.userId,
    });

    const createOrderItem = await orderItem.save();
    orderItems.push(createOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItems,
    shippingAddress: shippingAddress._id,
  });

  const savedOrder = await createdOrder.save();
  const clearCart=await cartService.clearUserCart(user._id)
  return savedOrder;
};

const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.paymentStatus = "COMPLETED";

  return await order.save();
};

const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  console.log(order);
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

const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};

const userOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({
      user: userId,
      // orderStatus: "PLACED",
    }).populate({ path: "orderItems", populate: { path: "product" } });

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
};
