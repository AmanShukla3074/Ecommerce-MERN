const express=require("express")
const router=express.Router();
const productController=require("../controller/productController");
const authenticate = require("../middleware/authenticationMiddleware");

router.get("/",authenticate,productController.getAllProduct)
router.get("/id/:id",authenticate,productController.findProductById)

module.exports=router