const { encryptPassword, comparePassword } = require("../helper/bcrypt.helper");
const { signToken } = require("../helper/jwt.helper");
const errorHelper = require("../helper/error.helper");
const userModel = require("../models").user;
const { sendEmail } = require("../helper/mail.helper");
const { async } = require("fast-glob");
const feedbackModel = require("../models/feedback.model");
const interviewModel = require("../models/interview.model");
const candidateModel = require("../models").candidate;
const employerModel = require("../models").employer;
module.exports.signUp = async (req, res, next) => {
  // try {
  //   const {
  //     body: { firstName, lastName, email, password, role, contactNumber },
  //   } = req;
  //   const user = await userModel
  //     .findOne({
  //       email,
  //     })
  //     .lean();
  //   if (user) {
  //     let err = "User Already Exist";
  //     return errorHelper.requestfailure(res, err);
  //   }
  //   const encryptedPassword = await encryptPassword(password);
  //   const newUser = await userModel.create({
  //     firstName,
  //     lastName,
  //     password: encryptedPassword,
  //     email,
  //     contactNumber,
  //     role,
  //   });
  //   const responseData = {
  //     token: await signToken(newUser._id.toString()),
  //     data: newUser,
  //   };
  //   let message = "User Created Succefully";
  //   return errorHelper.success(res, responseData, message);
  // } catch (error) {
  //   next(error);
  // }
};

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await userModel
      .findOne({
        email,
      })
      .select("-createdAt -updatedAt -__v")
      .lean();
    if (!user) {
      let message = "User does not exist";
      return errorHelper.requestfailure(res, message);
    }

    if (!(await comparePassword(password, user.password))) {
      let message = "Credentials does not match!";
      return errorHelper.requestfailure(res, message);
    }
    delete user.password;
    const responseData = {
      token: await signToken(user._id.toString()),
      data: user,
    };
    let message = "User Logged In Successfully!";
    return errorHelper.success(res, responseData, message);
  } catch (error) {
    next(error);
  }
};
module.exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    const token = crypto.randomBytes(20).toString("hex");
    if (user) {
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
      await sendEmail(req.body.email, token);
      let msg = "Please Check your Email Associted with account";
      return errorHelper.success(res, msg);
    }
    let message = "User not found";
    return errorHelper.requestfailure(res, message);
  } catch (error) {
    next(error);
  }
};
module.exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const user = await userModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    let message = "Invalid or expired token";
    return errorHelper.badRequest(res, message);
  }
  const encryptedPassword = await encryptPassword(req.body.password);
  user.password = encryptedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  let message = "Password Updated Successfully";
  return errorHelper.success(res, message);
};
module.exports.getFeedbackById = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await interviewModel.findById(feedbackId).lean();
    const { candidateId, employerId } = feedback;
    const candidate = await candidateModel
      .findById(candidateId)
      .select("name")
      .lean();
    const employer = await employerModel
      .findById(employerId)
      .select("name")
      .lean();
    const feedbackStatus = await feedbackModel
      .findById(feedbackId)
      .select("status isSubmitted")
      .lean();
    const response = {
      candidate,
      employer,
      feedbackStatus,
    };
    return errorHelper.success(res, response, "");
  } catch (error) {
    next(error);
  }
};
module.exports.createFeedback = async (req, res, next) => {
  try {
    const existingFeedback = await feedbackModel.findOne({
      _id: req.params.id,
    });

    if (!existingFeedback) {
      let message = "Feedback Not exist";
      return errorHelper.requestfailure(res, message);
    }
    existingFeedback.history.push({
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      remarks: req.body.remarks,
      status: req.body.status,
    });
    await existingFeedback.save();
    res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports.updateInterviewCreateFeedback = async (req, res, next) => {
  try {
    const interviewId = req.params.id;
    const newStatus = req.body.status;

    if (newStatus === "reschedule") {
      const updatedFeedback = {
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        status: newStatus,
        isSubmitted: true,
        interviewLink: req.body.interviewLink,
      };
      await interviewModel.findOneAndUpdate(
        { _id: interviewId },
        { $set: { feedback: updatedFeedback } },
        { new: true }
      );

      const newFeedbackCreate = {
        ...req.body,
        status: newStatus,
      };
      const historyFeedback = await feedbackModel.create(newFeedbackCreate);
    } else if (newStatus === "hire" || newStatus === "reject") {
      await interviewModel.findOneAndUpdate(
        { _id: interviewId },
        { $set: { 'feedback.status': newStatus } }
      );

      const newFeedbackCreate = {
        ...req.body,
        status: newStatus,
      };
      const historyFeedback = await feedbackModel.create(newFeedbackCreate);
    }

    let message = "Interview Reschedule";
    return errorHelper.success(res, message);
  } catch (error) {
    next(error);
  }
};

