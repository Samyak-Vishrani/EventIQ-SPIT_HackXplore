import CommitteeMember from "../models/committee.member.model.js";
import User from "../models/user.model.js";
import Committee from "../models/committee.model.js";
import Department from "../models/department.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Admin Login (Committee Head)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find committee by email
    const committee = await Committee.findOne({ email });
    if (!committee) return res.status(404).json({ error: "Committee not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, committee.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: committee._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token, committee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CoCom Login (Using Joining Code)
export const cocomLogin = async (req, res) => {
  try {
    const { joiningCode, userId } = req.body;

    // Find committee by joining code
    const committee = await Committee.findOne({ joiningCode });
    if (!committee) return res.status(404).json({ error: "Invalid joining code" });

    // Get list of departments associated with the committee
    const departments = await Department.find({ committee: committee._id }).select("dept_name tasks");

    // Check if user already exists as a committee member
    let committeeMember = await CommitteeMember.findOne({ user: userId, committee: committee._id });

    if (!committeeMember) {
      // Assign the user to the first department (or a default one)
      const defaultDepartment = departments.length > 0 ? departments[0]._id : null;

      // Create new committee member
      committeeMember = new CommitteeMember({
        user: userId,
        committee: committee._id,
        department: defaultDepartment,
        role: "cocom",
      });

      await committeeMember.save();

      // Add member to the committee's member list
      await Committee.findByIdAndUpdate(committee._id, { $push: { members: committeeMember._id } });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: committee._id, role: "cocom" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ 
      message: "Login successful", 
      token, 
      committee, 
      departments, 
      committeeMember 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a Committee Member
export const createCommitteeMember = async (req, res) => {
  try {
    const { user, committee, department, role } = req.body;

    // Check if User exists
    const existingUser = await User.findById(user);
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    // Check if Committee exists
    const existingCommittee = await Committee.findById(committee);
    if (!existingCommittee) return res.status(404).json({ error: "Committee not found" });

    const newCommitteeMember = new CommitteeMember({
      user,
      committee,
      department,
      role
    });

    await newCommitteeMember.save();

    // Add member to the committee's member list
    await Committee.findByIdAndUpdate(committee, { $push: { members: newCommitteeMember._id } });

    res.status(201).json(newCommitteeMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Committee Members
export const getAllCommitteeMembers = async (req, res) => {
  try {
    const members = await CommitteeMember.find()
      .populate("user", "name email")
      .populate("committee", "name email")
      .populate("department", "dept_name");
      
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Committee Member by ID
export const getCommitteeMemberById = async (req, res) => {
  try {
    const member = await CommitteeMember.findById(req.params.id)
      .populate("user", "name email")
      .populate("committee", "name email")
      .populate("department", "dept_name");

    if (!member) return res.status(404).json({ error: "Committee Member not found" });

    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Committee Member
export const updateCommitteeMember = async (req, res) => {
  try {
    const updatedMember = await CommitteeMember.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedMember) return res.status(404).json({ error: "Committee Member not found" });

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Committee Member
export const deleteCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Committee Member not found" });

    // Remove member from committee members list
    await Committee.findByIdAndUpdate(member.committee, { $pull: { members: member._id } });

    await CommitteeMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Committee Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
