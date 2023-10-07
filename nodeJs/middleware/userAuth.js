const jwt = require("jsonwebtoken");
const userData = require("../model/userModel");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    
    if (!authorization) throw new Error('authorization header required');

    const token = authorization.replace("Bearer ", "");
    const decrypted = jwt.verify(token, "userJwtToken");
    
    if(!decrypted.id) throw new Error('')
    const user = await userData.findById({_id:decrypted.id})
    if(!user) throw new Error('user not found')
    req.user = user
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = auth;
