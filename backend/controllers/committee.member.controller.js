import CommitteeMember from "../models/committee.member.model.js";
import User from "../models/user.model.js";
import Committee from "../models/committee.model.js";

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
