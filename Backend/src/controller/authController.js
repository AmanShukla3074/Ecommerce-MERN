const jwtProvider = require("../config/jwtProvider");
const userServices = require("../services/userServices");
const bcrypt = require("bcrypt")
const cartServices = require("../services/cartServices")

const register = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    const jwt = jwtProvider.genreteToken(user._id);

    await cartServices.createCart(user);
    return res.status(200).send({ jwt, message: "registered successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login=async(req,res)=>{
    const {password,email}=req.body;
    try {
        const user=await userServices.getUserByEmail({email});
        // console.log(user);
        if(!user){
            return res.status(400).send({message: "user note found with email:",email});
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).send({message: "Invalid Password"});
        }

        const token = jwtProvider.genreteToken(user._id);
        // console.log(token)
        return res.status(200).send({ token, message: "login successfully" });

    } catch (error) {
        return res.status(500).send({ error: error.message });  
    }
}

module.exports={register,login}