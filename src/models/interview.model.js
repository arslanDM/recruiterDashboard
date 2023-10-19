interviewSchema = new Schema(
  {
    employerId: {
      type: mongoose.Types.ObjectId,
      ref: "employer",
    },
    candidateId: {
      type: mongoose.Types.ObjectId,
      ref: "candidate",
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "job",
    },
    link: {
      type: String,
    },
    Date: {
      type: Date,
      required: true,
    },
    startTime: String,
    endTime: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);
