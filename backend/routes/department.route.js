import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {createDepartment,
        getAllDepartments, 
        getDepartmentById, 
        updateDepartment, 
        deleteDepartment, 
        appendTaskToDepartment,
    } 
from "../controllers/department.controller.js";

const router = express.Router();

router.post("/", createDepartment);  // Create Department
router.get("/", getAllDepartments);  // Get All Departments
router.get("/:id", getDepartmentById);  // Get Single Department by ID
router.put("/:id", updateDepartment); // Update Department
router.delete("/:id", deleteDepartment); // Delete Department
router.patch("/:id/append-task", appendTaskToDepartment);

export default router;
