const express=require("express")
const router=express.Router();
const authController=require("../controller/authController")

// router.post("/singup",authController.register)
// router.post("/singin",authController.login)
router.post("/register", authController.register);
router.post("/verify-otp-register", authController.verifyOtpAndRegister);
router.post("/login", authController.login);
router.post("/verify-otp-login", authController.verifyOtpAndLogin);
// router.post("/register", userController.register);
// router.post("/verify-otp-register", userController.verifyOtpAndRegister);
// router.post("/login", userController.login);
// router.post("/verify-otp-login", userController.verifyOtpAndLogin);
module.exports=router; 