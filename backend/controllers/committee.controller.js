import Committee from "../models/committee.model.js";
import CommitteeMember from "../models/committee.member.model.js";
import Department from "../models/department.model.js";
import bcrypt from "bcryptjs";

export const createCommittee = async (req, res) => {
  try {
    const { name, email, password, joiningCode } = req.body;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const committee = new Committee({
      name,
      email,
      password: hashedPassword, // Store hashed password
      joiningCode,
    });

    await committee.save();
    res.status(201).json(committee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCommittees = async (req, res) => {
  try {
    const committees = await Committee.find().populate("members");
    res.json(committees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCommittee = async (req, res) => {
  try {
    const committee = await Committee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(committee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCommittee = async (req, res) => {
  try {
    await Committee.findByIdAndDelete(req.params.id);
    res.json({ message: "Committee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDepartmentsByCommitteeId = async (req, res) => {
  try {
    const { committeeId } = req.params; // Get committee ID from request params

    // Check if committee exists
    const committee = await Committee.findById(committeeId);
    if (!committee) return res.status(404).json({ error: "Committee not found" });

    // Fetch all departments linked to the committee
    const departments = await Department.find({ committee: committeeId }).select("dept_name tasks");

    res.status(200).json({ committee, departments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDepartmentsByJoiningCode = async (req, res) => {
  try {
    const { joiningCode } = req.params; // Get joining code from request params

    // Find the committee using the joining code
    const committee = await Committee.findOne({ joiningCode });
    if (!committee) return res.status(404).json({ error: "Invalid joining code" });

    // Fetch all departments associated with the found committee
    const departments = await Department.find({ committee: committee._id }).select("dept_name tasks");

    res.status(200).json({ committee, departments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};