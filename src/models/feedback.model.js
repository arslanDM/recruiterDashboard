feebackSchema = new Schema(
  {
    feebackDesc: {
      type: String,
    },

    employerId: {
      type: mongoose.Types.ObjectId,
      ref: "employer",
    },
    candidateId: {
      type: mongoose.Types.ObjectId,
      ref: "candidate",
    },
    status: {
      type: String,
      enum: ["in-process", "reject", "offer sent", "hire"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feebackSchema);
