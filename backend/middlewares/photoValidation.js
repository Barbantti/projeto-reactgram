const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("Title is mandatory.")
      .isString()
      .withMessage("Title is mandatory.")
      .isLength({ min: 3 })
      .withMessage("Title must be least 3 characters."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is mandatory.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("Title is mandatory.")
      .isLength({ min: 3 })
      .withMessage("Title must be least 3 characters."),
  ];
};

const commentValidation = () => {
  return [body("comment").isString().withMessage("Comment is mandatory.")];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
