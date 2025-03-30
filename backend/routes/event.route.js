import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, getParticipants } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);  // Create Event
router.get("/", getAllEvents);  // Get All Events
router.get("/:id", getEventById);  // Get Single Event by ID
router.put("/:id", updateEvent); // Update Event
router.delete("/:id", deleteEvent); // Delete Event
router.get("/:eventId/participants", getParticipants);

export default router;
