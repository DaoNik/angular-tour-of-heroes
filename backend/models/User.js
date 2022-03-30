const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  username: {
    type: String,
    minLenght: 2,
    maxlength: 100,
    default: "anonymous",
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  refreshToken: {
    type: String,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
    },
    default:
      "https://images.unsplash.com/photo-1648629630882-249e7357372f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  userRights: {
    type: String,
    default: "full",
  },
});

module.exports = model("user", userSchema);
