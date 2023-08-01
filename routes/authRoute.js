const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/authControllers.js");
const authMiddlewares = require("../middlewares/authMiddleware.js");
// const RegModel=require('../models/userModel.js')

router.post("/register", Controllers.registeringUser);
router.post("/login", Controllers.loginUser);

//  One protected route to test JWT
router.get(
  "/proute",
  authMiddlewares.authhMiddleware,
  authMiddlewares.isAdmin,
  Controllers.consolingProtectedRoute
);

// Protected route to check if user logged
router.get("/user-auth", authMiddlewares.authhMiddleware, (req, res) => {
  res.send({ ok: true });
});
module.exports = router;
// For forgot pass
router.post("/forgotpass", Controllers.forgotPass);
router.post("/changepass", Controllers.changePass);
