import express from "express";
import authmiddleware from "../middlewares/auth.middleware.js";
import { getUserNotifications, markNotificationAsRead, deleteNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/notifications", getUserNotifications);
router.patch("/notifications/:id/read", markNotificationAsRead);
router.delete("/notifications/:id", deleteNotification);

export default router;
