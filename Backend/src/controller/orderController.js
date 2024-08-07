const orderService = require("../services/orderService");
const cartService = require("../services/cartService");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");


const dotenv=require("dotenv").config();

// const createOrder = async (req, res) => {
//   const user = req.user;

//   try {
//     const createdOrder = await orderService.createOrder(user, req.body);
//     return res.status(200).send(createdOrder);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const user = req.user;
  const { selectedAddressId ,totalPrice} = req.body;

  try {
    const razorpayOrder = await orderService.createRazorpayOrder(totalPrice);

    const newOrder = await orderService.createOrder(user, 
      selectedAddressId,
     razorpayOrder.id);


    res.status(200).send({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const order = await Order.findOneAndUpdate(
      { 'paymentDetails.transactionId': razorpay_order_id },
      {
        'paymentDetails.paymentId': razorpay_payment_id,
        'paymentDetails.paymentStatus': 'SUCCESS',
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: error.message });
  }
};


// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const createOrder = async (req, res) => {
//   const user = req.user;
//   const {
//     totalPrice,
//     selectedAddressId,
//     orderItems,
//     totalItem,
//     totalDiscountedPrice,
//     discount
//   } = req.body;

//   try {
//     const razorpayOrder = await orderService.createRazorpayOrder(totalPrice);

//     const newOrder = new Order({
//       user: user._id,
//       orderItems,
//       shippingAddress: selectedAddressId,
//       totalPrice,
//       totalItem,
//       totalDiscountedPrice,
//       discount,
//       paymentDetails: {
//         paymentMethod: 'RAZORPAY',
//         transactionId: razorpayOrder.id,
//       },
//     });

//     const neworder = await newOrder.save();

//     if(neworder){
//       await cartService.clearUserCart(user._id)
//     }

//     res.status(200).send({
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).send({ error: error.message });
//   }
// };

// const verifyPayment = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   try {
//     const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//     hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const generated_signature = hmac.digest('hex');

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ error: "Invalid signature" });
//     }

//     const order = await Order.findOneAndUpdate(
//       { 'paymentDetails.transactionId': razorpay_order_id },
//       {
//         'paymentDetails.paymentId': razorpay_payment_id,
//         'paymentDetails.paymentStatus': 'SUCCESS',
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     res.json({ order });
//   } catch (error) {
//     console.error("Payment verification failed:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


const findOrderById = async (req, res) => {
  const user = req.user;

  try {
    const order = await orderService.findOrderById(req.params.id);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const orderHistory = async (req, res) => {
  const user = req.user;
  try {
    const order = await orderService.userOrderHistory(user._id);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory,
  verifyPayment
};
