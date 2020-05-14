const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  article: { type: Types.ObjectId },
});

module.exports = model("Comment", schema);
