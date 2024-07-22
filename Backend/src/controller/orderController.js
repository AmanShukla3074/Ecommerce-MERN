const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  const user = req.user;

  try {
    const createdOrder = await orderService.createOrder(user, req.body);
    return res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

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
};
