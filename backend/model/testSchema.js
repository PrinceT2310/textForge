import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  userId: String,
  topic: {
    type: String,
    required:[true,"topic not provided"]
  },
  questions: {
    type: Object,
    required:[true,"topic not provided"]
  },   // full question paper     // user answers
  userAnswers:{
    type: Object,
    required:[true,"topic not provided"]
  },
  result: {
    type: Object,
    required:[true,"topic not provided"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Test = mongoose.model("test",testSchema)

export default Test;