interviewSchema = new Schema(
  {
    employerId: {
      type: mongoose.Types.ObjectId,
      ref: "employer",
    },
    candidateId: {
      type: mongoose.Types.ObjectId,
      ref: "Candidate",
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "job",
    },
    date: {
      type: mongoose.Types.ObjectId,
    },
    selectedSlot: {
      type: mongoose.Types.ObjectId,
    },
    feedback: {
      date: String,
      startTime: String,
      endTime: String,
      remarks: String,
      status: {
        type: String,
        enum: ["in-process", , "reschedule", "reject", "offer sent", "hire"],
      },
      isSubmitted:Boolean
    },
    interviewLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);
