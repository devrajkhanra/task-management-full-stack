const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
