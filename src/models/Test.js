const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  task: { type: String, required: true },
  defaultInput: { type: String },
  correctQuery: { type: String, required: true },
  expectedOutput: { type: String, required: true },
});

module.exports = model("Test", schema);
