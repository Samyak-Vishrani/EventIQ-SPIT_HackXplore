import Checklist from "../models/checklist.model.js";
import Event from "../models/event.model.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const createChecklist = async (req, res) => {
  try {
    const { eventId, task, currency ,departments } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const response = await axios.post(`${process.env.LLM}/analyze-task`, { task, departments });

    if (!response.data || !response.data.assignments) {
      return res.status(500).json({ error: "Failed to generate task breakdown from LLM API" });
    }

    const checklist = new Checklist({
      event: eventId, // event se relate kar raha h8u checklist ko
      main_task: task,
      currency: currency || response.data.total_budget.currency, // currency daalna bhul gaya tha
      assignments: response.data.assignments,
      total_budget: response.data.total_budget
    });

    await checklist.save();
    res.status(201).json(checklist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChecklistsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const checklists = await Checklist.find({ event: eventId });
    res.status(200).json(checklists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChecklistByDepartmentForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const checklists = await Checklist.find({ event: eventId });

    const departmentWiseChecklist = {};

    checklists.forEach((checklist) => {
      checklist.assignments.forEach((task) => {
        const department = task.department;
        if (!departmentWiseChecklist[department]) {
          departmentWiseChecklist[department] = [];
        }
        departmentWiseChecklist[department].push(task);
      });
    });

    res.status(200).json(departmentWiseChecklist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedChecklist = await Checklist.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedChecklist) return res.status(404).json({ error: "Checklist not found" });

    res.status(200).json(updatedChecklist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    await Checklist.findByIdAndDelete(id);
    res.status(200).json({ message: "Checklist deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
