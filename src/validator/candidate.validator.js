const { body } = require("express-validator");

const candidateValidator = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.inValidEmail),

  body("phoneNumber")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 8 })
    .withMessage(messages.invalidLength(8)),
    body("organization")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
    body("jobTitle")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
    body("experience")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
    body("country")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
    body("city")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
    body("personalAddress")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    
];
module.exports = {
  candidateValidator
};