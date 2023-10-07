const users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const hashData = async (password) => {
  const hashpassword = await bcrypt.hash(password, 10);

  return hashpassword;
};

const signup = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const checkEmail = await users.findOne({ email: email });

    if (checkEmail) {
      return res.json({ status: false, message: "User already exit" });
    } else {
      const hashPassword = await hashData(password);

      const user = new users({
        name,
        email,
        password: hashPassword,
        phoneNumber,
      });
      const userData = await user.save();

      if (userData)
        return res.json({ status: true, message: "Successfully created" });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await users.findOne({ email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        let token = jwt.sign({ id: userData._id }, "userJwtToken", {
          expiresIn: "2d",
        });

        const obj = {
            token,
            userName:userData.name
        }

        res
          .cookie('login', obj, {
            sameStie: "Strict",
            path: "/home",
            expires: new Date(new Date().getTime() + 60*1000),
            secure: true,
          })
          .json({
            status: true,
            message: "Login successfull",
            user: userData,
            token,
          });
      } else {
        res.json({ status: false, message: "Incorrect Password" });
      }
    } else {
      res.json({ status: false, message: "User not found" });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const userProfile = async (req, res) => {
  const userId = req.query.id;
  try {
  //  console.log(req.user);
    
    if (req.user) {
      res.json({ status: true, user: req.user });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const uploadImage = async (req, res) => {
  const userId = req.body.id;
  try {
    // const url = req.file.path;
   
    const userData = await users.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          image: req.file.filename,
        },
      }
    );
    if (userData) {
      console.log("success");
      res.json({ status: true});
    } else {
      console.log("failed");
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  signup,
  login,
  userProfile,
  uploadImage,
};
