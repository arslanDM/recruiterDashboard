const controller = require("./../controllers/index").auth;
const { request } = require("../middlewares/express-validator.middleware");
const { restrictTo } = require("./../middlewares/jwt.middleware");
const {
  authSignUpValidator,
  authLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validator/auth.validator");

router
  .post("/signup", authSignUpValidator, request, controller.signUp)
  .post("/login", authLoginValidator, request, controller.login);
router.post(
  "/forgotPassword",
  forgotPasswordValidator,
  request,
  controller.forgotPassword
);
router.post(
  "/resetPassword/:token",
  resetPasswordValidator,
  request,
  controller.resetPassword
);
router.get("/status-tracking/:id", controller.getFeedbackById);
router.post("/createFeedback/:id",controller.createFeedback);
router.put("/updateInterviewCreateFeedback/:id",controller.updateInterviewCreateFeedback);
module.exports = { prefix: "auth", router };
