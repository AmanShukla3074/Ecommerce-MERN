const jwtProvider = require("../config/jwtProvider");
const userServices = require("../services/userService");
const bcrypt = require("bcrypt");
const cartServices = require("../services/cartService");
const otpService = require("../config/otpService");
const User = require("../models/userModel");


const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "All fields (firstName, lastName, email, password) are required." });
    }

    let user = await userServices.getUserByEmail({email});

    if (user) {
      return res.status(500).send({ error: "user already registered" });
    }

    user = await userServices.createUser({ firstName, lastName, email, password });

    const otp = otpService.generateOtp();
    await otpService.sendOtp(email, otp);

    const savedOtp = await userServices.saveOtp(email, otp);

    if (savedOtp.matchedCount === 0) {
      return res.status(400).send({ message: "OTP not saved, user not found." });
    }

    return res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const verifyOtpAndRegister = async (req, res) => {
  try {
    const { email, otp, firstName, lastName, password } = req.body;

    if (!email || !otp || !firstName || !lastName || !password) {
      return res.status(400).send({ message: "All fields (email, otp, firstName, lastName, password) are required." });
    }

    const isOtpValid = await userServices.verifyOtp(email, otp);

    if (!isOtpValid) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    const user = await userServices.getUserByEmail({email});
    if (!user) {
      return res.status(400).send({ message: "User not found with email, registration incomplete." });
    }

    user.verified = true;
    await user.save();

    const token = jwtProvider.genreteToken(user._id);

    await cartServices.createCart(user);

    return res.status(201).send({ token, message: "Registered successfully" ,user});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userServices.getUserByEmail({ email });

    if (!user) {
      return res.status(400).send({ message: `User not found with email: ${email}` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const otp = otpService.generateOtp();
    await otpService.sendOtp(email, otp);
    await userServices.saveOtp(email, otp);

    return res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const verifyOtpAndLogin = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const isOtpValid = await userServices.verifyOtp(email, otp);

    if (!isOtpValid) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    const user = await userServices.getUserByEmail({ email });
    const token = jwtProvider.genreteToken(user._id);

    return res.status(200).send({ token, message: "Login successfully",user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const requestPasswordChangeOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found with this email." });
    }

    const otp = otpService.generateOtp();
    await otpService.sendOtp(email, otp);
    await User.updateOne({ email }, { otp, otpExpires: Date.now() + 10 * 60 * 1000 }); // Set OTP expiration

    return res.status(200).send({ message: "OTP sent to email." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const verifyPasswordChangeOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).send({ message: "All fields (email, otp, newPassword) are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found with this email." });
    }

    // Verify OTP
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).send({ message: "Invalid or expired OTP." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.updateOne({ email }, { password: hashedPassword, otp: null, otpExpires: null });

    return res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


module.exports = { 
  register, 
  verifyOtpAndRegister, 
  login, 
  verifyOtpAndLogin,
  requestPasswordChangeOtp,
  verifyPasswordChangeOtp
};