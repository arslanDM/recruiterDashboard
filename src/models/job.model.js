const jobSchema = new Schema({
  employerId: {
    type: mongoose.Types.ObjectId,
    ref: "Employer", // Reference to an employer model
  },
  jobDescription: String,
  dates: [
    {
      date: {
        type: Date,
        required: true,
      },
      timeSlots: [
        {
          startTime: String,
          endTime: String,
          timeZone: String,
          status: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Job", jobSchema);
