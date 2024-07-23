const userServices = require("../services/userService");

const getUserProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).send({ error: "Authorization header not found" });
    }

    const jwt = authHeader.split(" ")[1]; // Split by space and get the second part

    if (!jwt) {
      return res.status(404).send({ error: "Token not found" });
    }

    const user = await userServices.userProfileByToken(jwt); // Await the function call

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const getAllUser = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUser };
