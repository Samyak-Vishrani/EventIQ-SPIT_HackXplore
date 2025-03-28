import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dept_name: {
        type: String,
        required: true,
    },
    committee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee",
        required: true,
    },
    tasks:[{
        type: String,
    }]
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;