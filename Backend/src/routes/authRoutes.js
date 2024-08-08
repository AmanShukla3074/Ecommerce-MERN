const express=require("express")
const router=express.Router();
const authController=require("../controller/authController")

router.post("/register", authController.register);
router.post("/verify-otp-register", authController.verifyOtpAndRegister);
router.post("/login", authController.login);
router.post("/verify-otp-login", authController.verifyOtpAndLogin);
router.post("/password-change", authController.requestPasswordChangeOtp);
router.post("/verify-password-change-otp", authController.verifyPasswordChangeOtp);

module.exports=router; 