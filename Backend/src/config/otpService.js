const crypto = require("crypto");
const emailService = require("./emailService");

const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

const sendOtp = async (email, otp) => {
  await emailService.sendOtpEmail(email, otp);
};

module.exports = {
  generateOtp,
  sendOtp
};
