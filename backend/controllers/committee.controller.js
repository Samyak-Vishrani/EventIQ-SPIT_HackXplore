import Committee from "../models/committee.model.js";
import CommitteeMember from "../models/committee.member.model.js";
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
