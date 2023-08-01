const JWT = require("jsonwebtoken");
const usermodel = require("../models/userModel.js");
require("dotenv").config();

exports.authhMiddleware = (req, res, next) => {
  try {
    const verifiedToken = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECTRETKEY
    );
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(500).send({ message: "Couldn't verify token", error });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user._id);
    if (user.role != 1) {
      res.status(200).send({ message: "You are not authorised" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .status({ success: false, message: "isAdmin middleware not working" });
  }
};
