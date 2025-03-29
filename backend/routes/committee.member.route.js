import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMemberById,
  updateCommitteeMember,
  deleteCommitteeMember,
  adminLogin,
  cocomLogin
} from "../controllers/committee.member.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCommitteeMember);  // Create Committee Member
router.get("/", authMiddleware, getAllCommitteeMembers);  // Get All Committee Members
router.get("/:id", authMiddleware, getCommitteeMemberById);  // Get Single Committee Member
router.put("/:id", authMiddleware, updateCommitteeMember);  // Update Committee Member
router.delete("/:id", authMiddleware, deleteCommitteeMember);  // Delete Committee Member
router.post("/admin/login", adminLogin); // Admin (Committee Head) Login Route
router.post("/cocom/login", cocomLogin); // CoCom (Committee Member) Login Route

export default router;
