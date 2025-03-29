import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMemberById,
  updateCommitteeMember,
  deleteCommitteeMember
} from "../controllers/committee.member.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCommitteeMember);  // Create Committee Member
router.get("/", authMiddleware, getAllCommitteeMembers);  // Get All Committee Members
router.get("/:id", authMiddleware, getCommitteeMemberById);  // Get Single Committee Member
router.put("/:id", authMiddleware, updateCommitteeMember);  // Update Committee Member
router.delete("/:id", authMiddleware, deleteCommitteeMember);  // Delete Committee Member

export default router;
