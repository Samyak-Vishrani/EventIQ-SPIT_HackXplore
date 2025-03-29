import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment, appendTaskToDepartment } from "../controllers/department.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDepartment);  // Create Department
router.get("/", authMiddleware, getAllDepartments);  // Get All Departments
router.get("/:id", authMiddleware, getDepartmentById);  // Get Single Department by ID
router.put("/:id", authMiddleware, updateDepartment); // Update Department
router.delete("/:id", authMiddleware, deleteDepartment); // Delete Department
router.patch("/:id/append-task", authMiddleware, appendTaskToDepartment);

export default router;
