const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;

    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields (firstName, lastName, email, password) are required.");
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error(`User already registered with this email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    return user;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw new Error(error.message);
  }
};

const saveOtp = async (email, otp) => {
  try {
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    const result = await User.updateOne({ email }, { otp, otpExpires });

    if (result.matchedCount === 0) {
      console.log(`No user matched with email: ${email}`);
    }
    if (result.modifiedCount === 0) {
      console.log(`No user updated with email: ${email}`);
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return false;
    }

    await User.updateOne({ email }, { otp: null, otpExpires: null });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};



const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    .populate("ratings")
    .populate("reviews");

    if (!user) {
      throw new Error("user not found with id:", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne( email )
    .populate("ratings")
    .populate("reviews");

    if (!user) {
      console.log("User not found with email:", email);
      return null;
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const userProfileByToken = async (token) => {
  try {
    console.log("token",token);
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("user not found with id:", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserPassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    const result = await User.updateOne({ _id: userId }, { password: hashedPassword });

    if (result.modifiedCount === 0) {
      throw new Error("Failed to update password.");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  userProfileByToken,
  getAllUsers,
  saveOtp,
  verifyOtp,
  updateUserPassword
};
