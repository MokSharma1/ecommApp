const userModel = require("../models/userModel");
const bcryptUse = require("../middlewares/bcrypt");
const JWT = require("jsonwebtoken");
const authMiddlewares = require("../middlewares/authMiddleware");

// To register user
exports.registeringUser = async (req, res) => {
  try {
    let { name, email, pass, sKey, phoneNo, role } = req.body;
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      res.send({ message: "email is required" });
    }
    if (!pass) {
      res.send({ message: "password is required" });
    }
    if (!phoneNo) {
      res.send({ message: "phoneNo is required" });
    }
    if (!sKey) {
      res.send({ message: "secretKey is required" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).send({ success: false, message: "User already exists" });
    }
    // RegisteringUser
    else {
      const PassafterHash = await bcryptUse.hashingPas(pass);
      const Reguser = await new userModel({
        name,
        email,
        pass: PassafterHash,
        sKey,
        phoneNo,
        role,
      }).save();
      res.status(201).send({
        success: true,
        message: "user registered successfully",
        Reguser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Couldn't register",
      error,
    });
  }
};

// To login user

exports.loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res
        .status(500)
        .send({ success: false, message: "Email or password is invalid" });
    }
    //  Finding user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registered. Please register",
      });
    }
    // Comparing password
    const match = await bcryptUse.comparePass(pass, user.pass);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Password is incorrect" });
    }
    // Generating token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECTRETKEY, {
      expiresIn: "4d",
    });
    res.status(200).send({
      success: true,
      message: "Successfully loggedIn",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNo,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Couldn't login. Try again",
    });
  }
};

// Protected Route controller
exports.consolingProtectedRoute = (req, res) => {
  try {
    res.send({
      success: true,
      message: "You are authorised. Successfully loggedIn as admin",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in the controller" });
  }
};

// For forgot pass
exports.forgotPass = async (req, res) => {
  const { email, sKey } = req.body;
  const userWhoForgot = await userModel.findOne({ email });
  try {
    if (!userWhoForgot) {
      res.status(300).send({
        success: false,
        message: "No such user exists. Please register",
      });
    } else {
      if (userWhoForgot.sKey == sKey) {
        res
          .status(200)
          .send({ success: true, message: "Now you can set new password" });
      } else {
        res.status(500).send({
          success: false,
          message: " Secret key is wrong. Please recheck",
        });
      }
    }
  } catch (error) {
    console.log({ error, message: "There's error in setting new Password" });
  }
};

// to change pass
exports.changePass = async (req, res) => {
  const { newpass, cnewpass, email } = req.body;
  if (newpass !== cnewpass) {
    return res
      .status(500)
      .send({ status: false, message: " Passwords didn't match  !" });
  }
  const newhashedPass = await bcryptUse.hashingPas(newpass);
  const user = await userModel.findOneAndUpdate(
    { email },
    { pass: newhashedPass }
  );
  res
    .status(200)
    .send({ success: true, message: "Password updated successfully" });
};
