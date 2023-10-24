const controller = require("./../controllers/index").user;
const { FileUpload } = require("./../helper/fileUpload.helper");
const { restrictTo } = require("./../middlewares/jwt.middleware");
const { authSignUpValidator } = require("../validator/auth.validator");
const { request } = require("../middlewares/express-validator.middleware");
const { candidateValidator } = require("../validator/candidate.validator");
const { employerValidator } = require("../validator/employer.validator");
router.post(
  "/createUser",
  authSignUpValidator,
  request,
  // restrictTo(["admin"]),
  controller.createUser
);
router.post(
  "/createCandidate",
  candidateValidator,
  request,
  restrictTo(["admin", "recruiter"]),
  FileUpload.single("cv"),
  controller.createCandidate
);
router.post(
  "/createEmployer",
  employerValidator,
  request,
  controller.createEmployer
); 
router.post("/createInterview",controller.createInterview)
router.post("/createJob",controller.createJob)
router.get("/getStaff",controller.getStaff);
router.get("/getCandidate", controller.getCandidate);
router.get("/getEmployer",controller.getEmployer);
router.get("/getJob",controller.getJob)
router.get("/getJob/:id",controller.getJobById)
router.get("/", controller.getUser);
router.get("/feedback",controller.getAllFeedback);
router.get("/getFeedbackbyId/:id",controller.getFeedbackbyId);
router.get("/getAllInterview",controller.getAllInterview)
router.delete("/deleteProfile/:id", controller.deleteProfile);
module.exports = { prefix: "user", router };
    