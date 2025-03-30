import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  subtask: { type: String, required: true },
  department: { type: String, required: true },
  instructions: { type: String, required: true },
  estimated_time: { type: String, required: true },
  estimated_budget: {
    amount: { type: Number, required: true },
    breakdown: { type: Object, default: {} },
    currency: { type: String, required: true }
  },
  completed: { type: Boolean, default: false }
});

const checklistSchema = new mongoose.Schema({
  event: {type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true}, // checklist ko event se relate kar raha hu
  main_task: { type: String, required: true },
  currency: { type: String, required: true },
  assignments: [subtaskSchema], 
  total_budget: {
    amount: { type: Number, required: true },
    breakdown: { type: Object, required: true }
  }
}, { timestamps: true });

const Checklist = mongoose.model("Checklist", checklistSchema);
export default Checklist;
