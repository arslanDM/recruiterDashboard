const { async } = require("fast-glob");
const errorHelper = require("../helper/error.helper");
const userModel = require("../models").user;
const candidateModel = require("../models").candidate;
const jobModel = require("../models").job;
const employerModel = require("../models").employer;
const interviewModel = require("../models").interview;
const feedbackModel = require("../models").feedback;
const { encryptPassword, comparePassword } = require("../helper/bcrypt.helper");
const { sendEmail } = require("./../helper/mail.helper");
module.exports.getUser = async (req, res, next) => {
  const { user } = req;
  try {
    return errorHelper.success(res, user);
  } catch (error) {
    next(error);
  }
};
module.exports.createUser = async (req, res, next) => {
  try {
    const {
      body: { email, password, role },
    } = req;
    const user = await userModel
      .findOne({
        email,
      })
      .lean();
    if (user) {
      let err = "User Already Exist";
      return errorHelper.requestfailure(res, err);
    }
    const encryptedPassword = await encryptPassword(password);
    const newUser = await userModel.create({
      email,
      password: encryptedPassword,
      email,
      role,
    });
    let message = "User Created Succefully";
    return errorHelper.success(res, newUser, message);
  } catch (error) {
    next(error);
  }
};
module.exports.createCandidate = async (req, res, next) => {
  try {
    const createCandidate = await candidateModel.create(req.body);
    if (createCandidate) {
      let message = "Candidate Created Succefully";
      return errorHelper.success(res, createCandidate, message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.createJob = async (req, res, next) => {
  try {
    const createJob = await jobModel.create(req.body);
    if (createJob) {
      let message = "Job Created Succefully";
      return errorHelper.success(res, createJob, message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.createEmployer = async (req, res, next) => {
  try {
    const employer = await employerModel.create(req.body);
    if (employer) {
      let message = "Employer Created Succefully";
      return errorHelper.success(res, "", message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.createInterview = async (req, res, next) => {
  // const feedbackData = {
  //   employerId: req.body.employerId,
  //   candidateId: req.body.candidateId,
  //   history: [
  //     {
  //       date: req.body.feedbackSlot.date,
  //       startTime: req.body.feedbackSlot.startTime,
  //       endTime: req.body.feedbackSlot.endTime,
  //       remarks: "",
  //       status: "in-process",
  //     },
  //   ],

  //   isSubmitted: false,
  // };
  const candidate = await candidateModel.findById(req.body.candidateId).lean();

  const employer = await employerModel.findById(req.body.employerId).lean();
  await jobModel.updateOne(
    {
      "dates._id": req.body.date,
      "dates.timeSlots._id": req.body.selectedSlot,
    },
    {
      $set: {
        "dates.$[outer].timeSlots.$[inner].status": "booked",
      },
    },
    {
      arrayFilters: [
        { "outer._id": req.body.date },
        { "inner._id": req.body.selectedSlot },
      ],
    }
  );
  try {
    const createInterview = await interviewModel.create(req.body);
    //const feedbackCreate = await feedbackModel.create(feedbackData);
    // const feedbackId = feedbackCreate._id;

    if (createInterview) {
      const interviewDetails = {
        date: req.body.feedbackSlot.date,
        startTime: req.body.feedbackSlot.startTime,
        endTime: req.body.feedbackSlot.endTime,
        interViewLink: req.body.interviewLink,
      };
      sendEmail(candidate.email, employer.email, interviewDetails, feedbackId);
      let message = "Interview Created Succefully";
      return errorHelper.success(res, createInterview, message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getAllFeedback = async (req, res, next) => {
  try {
    const allFeedback = await feedbackModel
      .find({})
      .populate("employerId")
      .populate("candidateId")
      .lean();
    return errorHelper.success(res, allFeedback);
  } catch (error) {
    next(error);
  }
};
module.exports.getFeedbackbyId=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const feedbackById = await feedbackModel
      .findOne({'_id':id})
      .populate("employerId")
      .populate("candidateId")
      .lean();
    return errorHelper.success(res, feedbackById);
  } catch (error) {
    next(error);
  }
};
module.exports.getAllInterview=async(req,res,next)=>{
  try {
    const interview = await interviewModel
      .findOne({})
      .populate("employerId")
      .populate("candidateId")
      .lean();
    return errorHelper.success(res, interview);
  } catch (error) {
    next(error);
  }
};
module.exports.getInterViewByJobId=async(req,res,next)=>{
  try{
   const jobId=req.params.id;
   const intervievByJobId = await interviewModel
   .find({ jobId })
   .populate('employerId')
   .populate('candidateId')
   .lean();
   return errorHelper.success(res, intervievByJobId);
  }
  catch(error){
    next(error);
  }
}
module.exports.createJob = async (req, res, next) => {
  try {
    const createJob = await jobModel.create(req.body);

    if (createJob) {
      let message = "Job Created Succefully";
      return errorHelper.success(res, createJob, message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getStaff = async (req, res, next) => {
  try {
    const getStaff = await userModel.find({ role: "recruiter" }).lean();
    if (getStaff) {
      return errorHelper.success(res, getStaff);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getCandidate = async (req, res, next) => {
  try {
    const getCandidate = await candidateModel.find({}).lean();
    if (getCandidate) {
      return errorHelper.success(res, getCandidate);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getEmployer = async (req, res, next) => {
  try {
    const getEmployer = await employerModel.find({}).lean();
    if (getEmployer) {
      return errorHelper.success(res, getEmployer);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getJob = async (req, res, next) => {
  try {
    const getEmployer = await jobModel
      .find({})
      .populate({
        path: "employerId",
        select: "name",
      })
      .lean();
    if (getEmployer) {
      return errorHelper.success(res, getEmployer);
    }
  } catch (error) {
    next(error);
  }
};

//create Interview
module.exports.getJobById=async(req,res,next)=>{
  try{
   const id=req.params.id;
    const jobById=await jobModel.findOne({_id:id}).populate("employerId").lean();
    return errorHelper.success(res, jobById);
  }
  catch(error){
  next(error);
  }
}
//remove profile
module.exports.deleteProfile = async (req, res, next) => {
  try {
    const profileID = req.params.id;
    const deletedUser = await profileModel.findByIdAndDelete(profileID);
    if (deletedUser) {
      let message = "Profile Deleted Successfully";
      return errorHelper.success(res, message);
    }
    let message = "Something Went Wrong";
    return errorHelper.requestfailure(res, message);
  } catch (error) {
    next(error);
  }
};
