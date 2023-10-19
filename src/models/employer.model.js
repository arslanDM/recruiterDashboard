employerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employer", employerSchema);
