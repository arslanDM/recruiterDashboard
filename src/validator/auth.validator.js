const { body } = require("express-validator");

const authSignUpValidator = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.inValidEmail),
  body("password")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
  body("role").exists().withMessage().notEmpty(),
];

const authLoginValidator = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.inValidEmail),
  body("password")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    
];
const forgotPasswordValidator = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.inValidEmail),
];
const resetPasswordValidator = [
  body("password")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
  body("confirmPassword")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
];
module.exports = {
  authSignUpValidator,
  authLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
