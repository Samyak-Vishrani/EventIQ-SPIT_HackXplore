import express from "express";
import authmiddleware from "../middlewares/auth.middleware.js";
import { getUserNotifications, markNotificationAsRead, deleteNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/notifications", authmiddleware, getUserNotifications);
router.patch("/notifications/:id/read", authmiddleware, markNotificationAsRead);
router.delete("/notifications/:id", authmiddleware, deleteNotification);

export default router;
