import express from "express";
import {
  createChecklist,
  getChecklistsByEvent,
  getChecklistByDepartmentForEvent,
  updateChecklist,
  deleteChecklist
} from "../controllers/checklist.controller.js";

const router = express.Router();

router.post("/", createChecklist);
router.get("/:eventId", getChecklistsByEvent);
router.get("/department-wise/:eventId", getChecklistByDepartmentForEvent);
router.put("/:id", updateChecklist);
router.delete("/:id", deleteChecklist);

export default router;
