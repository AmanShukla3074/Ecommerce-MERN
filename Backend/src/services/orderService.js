const Address = require("../models/addressModel");
const OrderItem = require("../models/orderItems");
const Order = require("../models/orderModel");
const cartService = require("../services/cartService");

const createOrder = async (user, shippingAddess) => {
  let address;

  if (shippingAddess._id) {
    let existAddress = await Address.findById(shippingAddess._id);
    address = existAddress;
  } else {
    address = new Address(shippingAddess);
    address.user = user;
    await address.save();

    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem ({
      product: item.product,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      discountedPrice: item.discountedPrice,
      userId: item.userId,
      // deliveryDate:item.deliveryDate,
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
    shippingAddess: address,
  });

  const savedOrder = await createdOrder.save();
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
