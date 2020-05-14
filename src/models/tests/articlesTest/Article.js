const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  date: { type: Date, default: Date.now },
});

module.exports = model("Article", schema);
