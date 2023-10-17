candidateSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    skillSet: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    cv: {
      type: String,
    },
    organization: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    experience: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    personalAddress: {
      type: String,
    },
    status: {
      type: String,
      enum: ["in-process", "reject","offer sent", "hire"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", candidateSchema);
