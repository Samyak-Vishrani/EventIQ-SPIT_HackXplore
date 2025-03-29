import Notification from "../models/notification.model.js";

// Create a new notification
export const createNotification = async (userId, departmentId, committeeId, message) => {
  try {
    const notification = new Notification({
      user: userId,
      department: departmentId,
      committee: committeeId,
      message,
    });

    await notification.save();
    return notification;
  } catch (err) {
    console.error("Error creating notification:", err.message);
  }
};

// Get all notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
