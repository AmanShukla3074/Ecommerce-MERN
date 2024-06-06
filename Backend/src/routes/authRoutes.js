const express=require("express")
const router=express.Router();
const authController=require("../controller/authController")

router.post("/singup",authController.register)
router.post("/singin",authController.login)

module.exports=router; 