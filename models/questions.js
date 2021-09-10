const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionsSchema = new Schema(
  {
    questionsPart1: { type: String, unique: true, required: true },
    questionImage: { type: String, required: false },
    questionsPart2: { type: String, unique: true, required: false },
    optionA: { type: String, unique: true, required: true },
    optionB: { type: String, unique: true, required: true },
    optionC: { type: String, unique: true, required: true },
    optionD: { type: String, unique: true, required: true },
    answer: { type: String, unique: true, required: true },
  },
  {
    timestamps: true
  }
);

const Questions = mongoose.model("Questions", questionsSchema);

module.exports = Questions;