import express from "express";
import {
  createCommittee,
  getAllCommittees,
  updateCommittee,
  deleteCommittee,
  getDepartmentsByCommitteeId,
  getDepartmentsByJoiningCode,
} from "../controllers/committee.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new committee
router.post("/", createCommittee);

// Get all committees
router.get("/", getAllCommittees);

// Update a committee by ID
router.patch("/:id", updateCommittee);

// Delete a committee by ID
router.delete("/:id", deleteCommittee);

router.get("/committeeId/:committeeId/departments", getDepartmentsByCommitteeId);
router.get("/joiningCode/:joiningCode/departments", getDepartmentsByJoiningCode);

export default router;
