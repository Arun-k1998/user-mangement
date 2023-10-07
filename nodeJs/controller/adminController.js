const users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await users.findOne({ email });
    if (userData) {
        // console.log(userData);
      if (userData.is_admin) {
        const passwordCheck = await bcrypt.compare(password, userData.password);
        if (passwordCheck) {
          const token = jwt.sign({ id: userData._id }, "adminSecrectkey", {
            expiresIn: "2d",
          });
          res.json({ status: true, message: "success", token,name:userData.name,id:userData._id });
        } else {
          res.json({ status: false, message: "password mismatch" });
        }
      } else {
        res.json({status:false,message:'entry restricted'})
      }
    } else {
      res.json({ status: false, message: "user not found" });
    }

    
  } catch (error) {
    console.log(error.message);
  }
};

const home = async(req,res)=>{
  try {
    const usersData = await users.find({is_admin:false})
    res.json({users:usersData})
  } catch (error) {
    
  }
}

const deleteUser = async(req,res)=>{
  try {
    const user = await users.findByIdAndDelete(req.body.id)
    if(user) return res.status(200).json({status:true,user})
  } catch (error) {
    console.log(error);
  }
}

const userDetails = async(req,res)=>{
  const userId = req.query.id
  try {
   
    const userData = await users.findById(userId)
    if(userData){
      res.json({user:userData,status:true})
    }
  } catch (error) {
    
  }
}

const updateUser = async(req,res)=>{
  const {email,name,phoneNumber,id}= req.body
  try {
    const userData = await users.findByIdAndUpdate({_id:id},{
      name,
      email,
      phoneNumber
    })
    if(userData){
      res.json({status:true,user:userData})
    }
    
  } catch (error) {
    console.log(error.message);
  }
}
const tokenVerification = (req,res)=>{
  try {
    
    res.json({status: true,name:req.user.name})
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  login,
  home,
  deleteUser,
  updateUser,
  userDetails,
  tokenVerification
};
