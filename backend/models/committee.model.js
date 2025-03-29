import mongoose from "mongoose";

const committeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  about: { 
    type: String, 
    default: null 
  },
  joiningCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CommitteeMember" 
  }]
}, { timestamps: true });

const Committee = mongoose.model("Committee", committeeSchema);
export default Committee;
