const express = require("express");
const router = express.Router();

// User Controller
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController");

// Imports from middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// ROUTES
// POST
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
// GET
router.get("/profile", authGuard, getCurrentUser);
router.get("/:id", getUserById);
// PUT / PATCH
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
// DELETE

module.exports = router;
