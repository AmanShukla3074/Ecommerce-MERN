const ratingService = require("../services/ratingService");

const createRatings = async (req, res) => {
  const user = req.user;

  try {
    const rating = await ratingService.creatingRating(req.body, user._id);
    return res.status(201).send(rating);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllRatings = async (req, res) => {
  productId = req.params.productId;
  try {
    const ratings = await ratingService.getProductRating(productId);
    return res.status(200).send(ratings);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createRatings,
  getAllRatings,
};
