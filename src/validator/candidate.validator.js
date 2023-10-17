const { body } = require("express-validator");

const candidateValidator = [
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
  body("contactNumber")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    body("organization")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    body("jobTitle")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    body("experience")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    body("country")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    body("city")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    body("personalAddress")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isLength({ min: 6 })
    .withMessage(messages.invalidLength(6)),
    
];
module.exports = {
  candidateValidator
};