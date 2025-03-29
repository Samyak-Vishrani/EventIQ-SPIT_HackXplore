import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, getParticipants } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEvent);  // Create Event
router.get("/", authMiddleware, getAllEvents);  // Get All Events
router.get("/:id", authMiddleware, getEventById);  // Get Single Event by ID
router.put("/:id", authMiddleware, updateEvent); // Update Event
router.delete("/:id", authMiddleware, deleteEvent); // Delete Event
router.get("/:eventId/participants", getParticipants);

export default router;
