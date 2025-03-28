import mongoose from "mongoose";

const committeeMemberSchema = new mongoose.Schema({
  // name: { 
  //   type: String, 
  //   required: true 
  // },
  department: { 
    type: String, 
    required: true, 
  },
  committee: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Committee", 
    required: true, 
  }],
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true // Ensures each committee member is linked to a user
  },
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  role:{
    type: String,
    enum: ["admin","cocom"],
    required: true,
  }
  // committeename :{
  //   type: String,
  //   required: true
  // }
}, { timestamps: true });

const CommitteeMember = mongoose.model("CommitteeMember", committeeMemberSchema);
export default CommitteeMember;
