feebackSchema = new Schema(
  {
    employerId: {
      type: mongoose.Types.ObjectId,
      ref: "employer",
    },
    candidateId: {
      type: mongoose.Types.ObjectId,
      ref: "Candidate",
    },
    interviewId: {
      type: mongoose.Types.ObjectId,
      ref: "interview",
    },
        date: {
          type: String,
        },
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
        remarks: {
          type: String,
        },
        status: {
          type: String,
          enum: ["in-process", , "reschedule", "reject", "offer sent", "hire"],
        },
     

    isSubmitted: {
      type: Boolean,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("feedback", feebackSchema);
