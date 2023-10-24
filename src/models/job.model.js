const jobSchema = new Schema({
  employerId: {
    type: mongoose.Types.ObjectId,
    ref: "employer", // Reference to an employer model
  },
  jobDescription: String,
  jobPosition:String,
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
