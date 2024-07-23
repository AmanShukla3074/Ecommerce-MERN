const addressService = require("../services/addressService");

const createAddress = async (req, res) => {
  const user = req.user;
  try {
    const address = await addressService.createAddress(user._id, req.body);
    return res.status(201).send(address);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findUserAllAddress = async (req, res) => {
  const user = req.user;
  try {
    const address = await addressService.findUserAllAddress(user._id);
    return res.status(200).send(address);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateAddress = async (req, res) => {
  const addressId = req.params.addressId;
  try {
    const updatedAddress = await addressService.updateAddress(addressId, req.body);
    return res.status(200).send(updatedAddress);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  const addressId = req.params.addressId;
  try {
    const deletedAddress = await addressService.deleteAddress(addressId);
    return res.status(200).send(deletedAddress);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports={
    createAddress,
    findUserAllAddress,
    updateAddress,
    deleteAddress,
}