const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name is mandatory.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters."),
    body("email")
      .isString()
      .withMessage("Email is mandatory.")
      .isEmail()
      .withMessage("Insert a valid email."),
    body("password")
      .isString()
      .withMessage("Password is mandatory")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
    body("confirmPassword")
      .isString()
      .withMessage("Confirmation password is required.")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Passwords ate not the same.");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("Email is mandatory.")
      .isEmail()
      .withMessage("Insert a valid email"),
    body("password").isString().withMessage("Password is mandatory."),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters.")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
