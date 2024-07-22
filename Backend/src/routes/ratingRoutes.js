const express=require("express")
const router=express.Router();
const ratingController=require("../controller/ratingController");
const authenticate = require("../middleware/authenticationMiddleware");

router.post("/create",authenticate,ratingController.createRatings)
router.get("/product/:productId",authenticate,ratingController.getAllRatings)

module.exports=router