const express=require("express")
const router=express.Router();
const orderController=require("../controller/orderController");
const authenticate = require("../middleware/authenticationMiddleware");

router.post("/create",authenticate,orderController.createOrder)
router.post("/verify-payment", authenticate, orderController.verifyPayment);
router.get("/user",authenticate,orderController.orderHistory)
router.get("/:id",authenticate,orderController.findOrderById)

module.exports=router