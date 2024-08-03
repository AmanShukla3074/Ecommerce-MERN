const express=require("express")
const router=express.Router();
const cartItemController=require("../controller/cartItemController");
const authenticate = require("../middleware/authenticationMiddleware");

router.put("/:id",authenticate,cartItemController.updateCartItem)
router.delete("/:id",authenticate,cartItemController.removeCartItem)
router.get("/:id",authenticate,cartItemController.findProductInCart)

module.exports=router