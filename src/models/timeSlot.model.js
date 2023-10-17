timeSlotSchema = new Schema(
  {
    employerId: {
      type: mongoose.Types.ObjectId,
      ref: "employer",
    },
    date: {
      type: Date,
    },
    timeSlot: [
      {
        startTime: String,
        endTime: String,
        timeZone: String,
        status: String,
      },
    ],

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("timeSlot", timeSlotSchema);
