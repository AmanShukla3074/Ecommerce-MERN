const Address = require("../models/addressModel");

const createAddress = async (userId, reqData) => {
  try {
    const address = new Address({
      firstName: reqData.firstName,
      lastName: reqData.lastName,
      streetAddress: reqData.streetAddress,
      city: reqData.city,
      zipcode: reqData.zipcode,
      mobile: reqData.mobile,
      user: userId,
    });

    return await address.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserAllAddress = async (userId) => {
  try {
    const addresses = await Address.find({ user: userId });
    return addresses;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAddress = async (adressId,reqData) => {
  try {
    const address = await Address.findByIdAndUpdate(adressId,reqData);
    return address
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAddress = async (addressId) => {
  try {
    const address = await Address.findByIdAndDelete(addressId);
    return `address with id ${addressId} is deleted`
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAddressById = async (addressId) => {
  try {
    const address = await Address.findById(addressId);
    return address;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports={
    createAddress,
    findUserAllAddress,
    updateAddress,
    deleteAddress,
    findAddressById,
}