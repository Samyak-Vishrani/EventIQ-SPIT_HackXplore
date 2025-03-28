import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  event_name: { 
    type: String, 
    required: true 
  },
  event_description: {
    type: String,
    required: true
  },
 video:{
  type: String,
  default: null
 },
 summary_video:{
  type: String,
  default: null
 }, 
  committeeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Committee", 
      required: true 
    },
  // committeeName: { 
  //     type: String, 
  //     required: true 
  //   },
  event_date: { 
    type: Date, 
    required: true 
  },
  event_venue:{
    type: String,
    required: true,
  },
  participants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
