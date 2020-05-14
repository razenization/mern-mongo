const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: "Link" }],
  completedTests: [{ type: Types.ObjectId, ref: "Test" }],
  avatar: { type: Types.ObjectId, ref: "Image" },
  isAdmin: { type: Boolean, default: false },
});

module.exports = model("User", schema);
