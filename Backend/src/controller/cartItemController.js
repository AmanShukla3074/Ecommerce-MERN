const cartItemService = require("../services/cartItemService");

const updateCartItem = async (req, res) => {
  const user = req.user;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  const user = req.user;
  try {
    const cartItem = await cartItemService.removeCartItem(user._id, req.params.id);
    // return res.status(200).send({ message: "cart item removed sucessfully" });
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductInCart = async (req, res) => {
  const user = req.user;
  try {
    const cartData=await cartItemService.findProductInCart(user._id, req.params.id);
    return res.status(200).send(cartData);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
  findProductInCart
};
