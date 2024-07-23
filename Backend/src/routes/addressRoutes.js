const express=require("express")
const router=express.Router()
const addressController=require("../controller/addressController")
const authenticate=require("../middleware/authenticationMiddleware")

router.post("/create",authenticate,addressController.createAddress)
router.get("/",authenticate,addressController.findUserAllAddress)
router.put("/update/:addressId",authenticate,addressController.updateAddress)
router.delete("/delete/:addressId",authenticate,addressController.deleteAddress)

module.exports=router