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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", candidateSchema);
