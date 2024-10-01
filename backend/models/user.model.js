import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, "Name must constian at least 3 characteres"],
      maxLength: [30, "Name can not exceed 30 characteres"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["applicant", "recruiter"],
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
