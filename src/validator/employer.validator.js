const { body } = require("express-validator");

const employerValidator = [
  body("email")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty)
    .isEmail()
    .withMessage(messages.inValidEmail),
  body("name")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
];
const jobValidator = [
  body("employerId")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
  body("jobDescription")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
  body("timeSlot")
    .exists()
    .withMessage(messages.notPresent)
    .notEmpty()
    .withMessage(messages.notEmpty),
  body("timeSlot")
    .isArray()
    .withMessage("timeSlot should be an array")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((item) => item.startTime);
    })
    .withMessage("Each timeSlot should have a startTime"),
  body("timeSlot")
    .isArray()
    .withMessage("timeSlot should be an array")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((item) => item.endTime);
    })
    .withMessage("Each timeSlot should have a endTime"),
  body("timeSlot")
    .isArray()
    .withMessage("timeSlot should be an array")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((item) => item.timeZone);
    })
    .withMessage("Each timeSlot should have a timeZone"),
];
module.exports = {
  employerValidator,
  jobValidator,
};
