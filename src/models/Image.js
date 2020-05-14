const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  type: { type: String },
  data: { type: Buffer, required: true },
  isAvatar: { type: Boolean, default: true },
  imageName: { type: String },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Image", schema);
