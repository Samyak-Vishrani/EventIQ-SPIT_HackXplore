import Department from "../models/department.model.js";
import Notification from "../models/notification.model.js";

// Create a Department
export const createDepartment = async (req, res) => {
  try {
    const { dept_name, committee, tasks } = req.body;

    const newDepartment = new Department({
      dept_name,
      committee,
      tasks
    });

    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("committee", "name email");
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate("committee", "name email");
    if (!department) return res.status(404).json({ error: "Department not found" });

    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Department
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ error: "Department not found" });

    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Department
export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Append a new task to the department and notify users
export const appendTaskToDepartment = async (req, res) => {
  try {
    const { task } = req.body;
    const departmentId = req.params.id;

    // Find the department
    const department = await Department.findById(departmentId).populate("committee");
    if (!department) return res.status(404).json({ error: "Department not found" });

    // Add the new task
    department.tasks.push(task);
    await department.save();

    // Get all committee members assigned to this department
    const committeeMembers = await CommitteeMember.find({ department: departmentId }).populate("user");

    // Create notifications for each member
    const notifications = committeeMembers.map(member => 
      createNotification(member.user._id, department._id, department.committee._id, `New task added: ${task}`)
    );

    await Promise.all(notifications);

    res.status(200).json({ message: "Task added and notifications sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};