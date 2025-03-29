import express from "express";
import {
  createCommittee,
  getAllCommittees,
  updateCommittee,
  deleteCommittee,
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

export default router;
