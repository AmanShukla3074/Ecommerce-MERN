const jwtProvider = require("../config/jwtProvider");
const userServices = require("../services/userService");
const bcrypt = require("bcrypt");
const cartServices = require("../services/cartService");
const otpService = require("../config/otpService");

// const register = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = otpService.generateOtp();
//     await otpService.sendOtp(email, otp);
//     const savedotp=await userServices.saveOtp(email, otp);
//     console.log("savedotp",savedotp);
//     return res.status(200).send({ message: "OTP sent to email" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// const register = async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log("Email in request:", email);

//     // Check if the user exists
//     const existingUser = await userServices.getUserByEmail(email);
//     if (!existingUser) {
//       console.log("User does not exist, creating new user.");
//       // Create a new user if not exist (optional, based on your flow)
//       await userServices.createUser({ email });
//     }

//     const otp = otpService.generateOtp();
//     await otpService.sendOtp(email, otp);
//     const savedOtp = await userServices.saveOtp(email, otp);
//     console.log("savedOtp", savedOtp);

//     return res.status(200).send({ message: "OTP sent to email" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "All fields (firstName, lastName, email, password) are required." });
    }

    // Check if the user already exists
    let user = await userServices.getUserByEmail(email);
    console.log("Existing user:", user);

    // If the user does not exist, create a new user
    if (!user) {
      user = await userServices.createUser({ firstName, lastName, email, password });
      console.log("New user created:", user);
    }

    // Generate and send OTP
    const otp = otpService.generateOtp();
    await otpService.sendOtp(email, otp);
    const savedOtp = await userServices.saveOtp(email, otp);
    console.log("savedOtp", savedOtp);

    if (savedOtp.matchedCount === 0) {
      return res.status(400).send({ message: "OTP not saved, user not found." });
    }

    return res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


// const verifyOtpAndRegister = async (req, res) => {
//   try {
//     const { email, otp, ...userData } = req.body;
//     const isOtpValid = await userServices.verifyOtp(email, otp);

//     if (!isOtpValid) {
//       return res.status(400).send({ message: "Invalid or expired OTP" });
//     }

//     const user = await userServices.createUser(userData);
//     const jwt = jwtProvider.generateToken(user._id);
//     await cartServices.createCart(user);

//     return res.status(200).send({ jwt, message: "Registered successfully" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };
const verifyOtpAndRegister = async (req, res) => {
  try {
    const { email, otp, firstName, lastName, password } = req.body;

    if (!email || !otp || !firstName || !lastName || !password) {
      return res.status(400).send({ message: "All fields (email, otp, firstName, lastName, password) are required." });
    }

    // Verify OTP
    const isOtpValid = await userServices.verifyOtp(email, otp);

    if (!isOtpValid) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    // Since the user is already created, no need to create again
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      return res.status(400).send({ message: "User not found with email, registration incomplete." });
    }

    // Generate JWT token
    const jwt = jwtProvider.genreteToken(user._id);
    await cartServices.createCart(user);

    return res.status(200).send({ jwt, message: "Registered successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};



const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userServices.getUserByEmail({ email });

    if (!user) {
      return res.status(400).send({ message: `User not found with email: ${email}` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const otp = otpService.generateOtp();
    await otpService.sendOtp(email, otp);
    await userServices.saveOtp(email, otp);

    return res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const verifyOtpAndLogin = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const isOtpValid = await userServices.verifyOtp(email, otp);

    if (!isOtpValid) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    const user = await userServices.getUserByEmail({ email });
    const token = jwtProvider.genreteToken(user._id);

    return res.status(200).send({ token, message: "Login successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, verifyOtpAndRegister, login, verifyOtpAndLogin };

// const jwtProvider = require("../config/jwtProvider");
// const userServices = require("../services/userService");
// const bcrypt = require("bcrypt")
// const cartServices = require("../services/cartService")

// const register = async (req, res) => {
//   try {
//     const user = await userServices.createUser(req.body);
//     const jwt = jwtProvider.genreteToken(user._id);

//     await cartServices.createCart(user);
//     return res.status(200).send({ jwt, message: "registered successfully" });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// const login=async(req,res)=>{
//     const {password,email}=req.body;
//     try {
//         const user=await userServices.getUserByEmail({email});
//         // console.log(user);
//         if(!user){
//             return res.status(400).send({message: "user note found with email:",email});
//         }

//         const isPasswordValid=await bcrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             return res.status(401).send({message: "Invalid Password"});
//         }

//         const token = jwtProvider.genreteToken(user._id);
//         // console.log(token)
//         return res.status(200).send({ token, message: "login successfully" });

//     } catch (error) {
//         return res.status(500).send({ error: error.message });  
//     }
// }

// module.exports={register,login}