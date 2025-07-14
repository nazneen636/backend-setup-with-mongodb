const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: [4, "Minimum 10 characters"],
    max: [30, "max character 30"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: [8, "min no 8"],
    max: [16, "max no 16"],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    max: [11, "max no 11"],
  },
  presentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
  },
  lastLogin: {
    type: Date,
    trim: true,
  },
});

module.exports = mongoose.model("user", userSchema);
