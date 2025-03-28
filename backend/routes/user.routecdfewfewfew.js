// import express from "express";
// import { 
//   AddUser, 
//   Verifyuser, 
//   AddCommittee, 
//   VerifyCommittee, 
//   deleteCommitteeMember, 
//   getCommitteeMembers, 
//   AddCommitteeMember, 
//   createEvent 
// } from "../controllers/Usercontroller.js";

// import authMiddleware from "../middlewares/auth.middleware.js"; 
// import upload from "../middlewares/multer.js";
// import { 
//   getAllBlogsByAuthor, 
//   createBlog, 
//   deleteBlog 
// } from "../controllers/blog.js";

// const router = express.Router();

// // User Authentication Routes
// router.post("/login", Verifyuser);
// router.post("/register", AddUser);

// // Committee Authentication Routes
// router.post("/commlogin", VerifyCommittee);
// router.post("/comm/signup", AddCommittee);

// // Committee Member Routes
// router.patch("/deletemember", authMiddleware, deleteCommitteeMember);
// router.get("/getmembers", authMiddleware, getCommitteeMembers);
// router.post("/addmember", authMiddleware, AddCommitteeMember);

// // Event Routes
// router.post("/createevent", authMiddleware, createEvent);

// /* Profile & Media Upload Routes (Commented) 
// router.patch("/profilepic", authMiddleware, upload.single("profileImage"), updateUserProfilePictures);
// router.patch("/audio", authMiddleware, upload.single("audio"), uploadUserMedia);
// router.post("/deletepicture", authMiddleware, deleteUserProfilePicture);
// router.post("/deleteaudio", authMiddleware, deleteUserAudio);
// */

// export default router;
