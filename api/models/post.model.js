import mongoose from "mongoose";

const peqSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Peq = mongoose.model("Peq", peqSchema);

export default Peq;
