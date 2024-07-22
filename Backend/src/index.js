const express=require("express");
const cors = require("cors");

const app=express()

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    return res.status(200).send({msg:"Hello,This Is MERN Ecommerce website"})
})

const authRouters=require("./routes/authRoutes")
app.use("/auth",authRouters)

const usersRouters=require("./routes/userRoutes")
app.use("/api/users",usersRouters)

const productRouter=require("./routes/productRoutes")
app.use("/api/product",productRouter)

const adminProductRouter=require("./routes/adminProductRoutes")
app.use("/api/admin/product",adminProductRouter)

const cartRouter=require("./routes/cartRoutes")
app.use("/api/cart",cartRouter)

const cartItemRouter=require("./routes/cartItemRoutes")
app.use("/api/cart_items",cartItemRouter)

const orderRouter=require("./routes/orderRoutes")
app.use("/api/orders",orderRouter)

const adminOrderRouter=require("./routes/adminOrderRoutes")
app.use("/api/admin/orders",adminOrderRouter)

const reviewRouter=require("./routes/reviewRoutes")
app.use("/api/reviews",reviewRouter)

const ratingRouter=require("./routes/ratingRoutes")
app.use("/api/ratings",ratingRouter)



module.exports=app;

