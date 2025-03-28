import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendmail } from "../utils/nodemailer.js";
import cloudinary from "../utils/cloudnary.js";
import fs from "fs";
import path from "path";
import Committee from "../models/committee.model.js";
import CommitteeMember from "../models/committee.member.model.js";
import Event from "../models/event.model.js";




env.config();
const Salt = process.env.Salt; 
const JWT_SECRET = process.env.jwt;

// // addition of user

// async function AddUser(req, res) {
//   const { email, password , name , contact , dob} = req.body;

//     try {
      
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).send('User already exists. Please login.');
//         }

//         // Directly hash the password with salt rounds
//         const hashedPassword = await bcrypt.hash(password, Salt);

//         // Create a new user with hashed password
//         user = new User({
//             email,
//             password: hashedPassword,
//             name,
//             contact,
//             dob
//         });

//         // Save the user to the database
//         await user.save();

//         // After signup, redirect to the login page
//         sendmail(email);
//         res.status(201).send('User registered successfully. Please login.');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };




// //verification of user

// async function Verifyuser(req, res) {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found. Please sign up.' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials.' });
//     }

//     // Create a JWT token with the user's email and user ID
//     const token = jwt.sign(
//       { email: user.email, _id: user._id ,
//         contact: user.contact,
//         name: user.name,
//       }, // Payload with email and user ID for security
//       JWT_SECRET,                          // Secret key from environment variables
//       { expiresIn: '1000h' }              // Token expiration time
//     );

//     // Send the token back to the client
//     return res.status(200).json({
//       message: 'Login successful!',
//       token: token
//     });

//   } catch (error) {
//     console.error('Error in HandleVerify:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }





// //adding committee


// async function AddCommittee(req, res) {
//     const { name, email, password, about, joiningCode } = req.body;
  
//     try {
//       let committee = await Committee.findOne({ email });
  
//       if (committee) {
//         return res.status(400).send("Committee already exists. Please login.");
//       }
  
//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Create new committee
//       committee = new Committee({
//         name,
//         email,
//         password: hashedPassword,
//         about,
//         joiningCode
//       });
  
//       // Save to DB
//       await committee.save();
  
//       res.status(201).send("Committee registered successfully. Please login.");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Server error");
//     }
//   }
  
//   //verify committee



//   async function VerifyCommittee(req, res) {
//     const { email, password } = req.body;
  
//     try {
//       // Find the committee by email
//       const committee = await Committee.findOne({ email });
  
//       if (!committee) {
//         return res.status(404).json({ message: "Committee not found. Please sign up." });
//       }
  
//       // Compare password
//       const isMatch = await bcrypt.compare(password, committee.password);
  
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials." });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign(
//         { email: committee.email, 
//          _id: committee._id, name: committee.name, joiningCode: committee.joiningCode },
//         JWT_SECRET,
//         { expiresIn: "1000h" }
//       );
  
//       res.status(200).json({
//         message: "Login successful!",
//         token: token
//       });
  
//     } catch (error) {
//       console.error("Error in VerifyCommittee:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }


// // adding committee member


// async function AddCommitteeMember(req, res) {
//     const { joiningCode, committeeName , department } = req.body;
//     const userId = req.user._id;
//     const userName = req.user.name;
//     try {
      
  
//      const committee = await Committee.findOne({ name: committeeName, joiningCode });
  
//       if (!committee) {
//         return res.status(404).json({ message: "Invalid committee name or joining code." });
//       }
  
//       // Create new committee member
//       const newCommitteeMember = new CommitteeMember({
//         name: userName,
//         department , // Default department, can be updated later
//         committee: committee._id,
//         user: userId,
//         committeename : committee.name
//       });
  
//       // Save to DB
//       await newCommitteeMember.save();
  
//       // Push the new member's ObjectId into the committee's members array
//       committee.members.push(newCommitteeMember._id);
//       await committee.save();
  
//       res.status(201).json({ message: "Successfully joined the committee!", committeeMember: newCommitteeMember });
  
//     } catch (error) {
//       console.error("Error in AddCommitteeMember:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
  
//   // get all commitee members



// async function getCommitteeMembers(req, res) {
//     const comId = req.user._id;
//     try {
      
//       // Find the committee where this user is an admin
//       const committeeMember = await CommitteeMember.findOne({  ommittee: domId });
//       if (!committeeMember) {
//         return res.status(403).json({ message: "no members" });
//       }

  
//       // Fetch all members in the same committee
//       const members = await CommitteeMember.find({ committee: committeeId })
//         .populate("user", "name email contact")
//         .populate("committee", "name");
  
//       res.status(200).json(members);
//     } catch (error) {
//       console.error("Error fetching committee members:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }


//   // deleting a committee member

//   async function deleteCommitteeMember(req, res) {
//     try {
//       const { memberId } = req.params;
  
//       // Find the member to get the associated committee ID
//       const member = await CommitteeMember.findById(memberId);
//       if (!member) {
//         return res.status(404).json({ message: "Committee member not found." });
//       }
  
//       const committeeId = member.committee;
  
//       // Delete the committee member
//       await CommitteeMember.findByIdAndDelete(memberId);
  
//       // Remove the member ID from the committee's members array
//       await Committee.findByIdAndUpdate(committeeId, {
//         $pull: { members: memberId }
//       });
  
//       res.status(200).json({ message: "Committee member deleted successfully." });
//     } catch (error) {
//       console.error("Error deleting committee member:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }




//   // event adding


//   async function createEvent(req, res) {
//     const comId = req.user._id;
//     const comname = req.user.name;

//     try {
//       // Extract event details from request body
//       const { name, date , description} = req.body;

  
//       // Create and save the event
//       const event = new Event({
//         name,
//         date,
//         committeeId : comId ,
//         committeeName : comname,
//         description
//       });
  
//       await event.save();
//       res.status(201).json({ message: "Event created successfully!", event });
//     } catch (error) {
//       console.error("Error creating event:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }


// module.exports = { AddUser , Verifyuser , AddCommittee , VerifyCommittee , AddCommitteeMember , deleteCommitteeMember, getCommitteeMembers , createEvent};