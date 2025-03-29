// exporting modules.
import express from "express";
import morgan from "morgan";
// const userRouter = require('./routes/user.routecdfewfewfew.js');
import connectMongoDb from "./config/connect.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 // Adjust the path as needed
//CLUSTER ON 1 PROJECT
const app = express();





//using middlewares.

app.use(morgan('tiny'));
app.use(express.json());
// Serve static files (optional, in case you need it for other purposes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// connecting env
dotenv.config();
const Url = process.env.CONNECTION_URL; 

// connecting database.
connectMongoDb();

// Importing the routes
import userRoute from "./routes/user.route.js";
import committeeRoute from "./routes/committee.route.js";
import committeeMemberRoute from "./routes/committee.member.route.js";
import eventRoute from "./routes/event.route.js";
import departmentRoute from "./routes/department.route.js";

//creating routes
app.get("/",(req,res)=>{res.send('Home')})
app.use("/user" , userRoute);
app.use("/committee" , committeeRoute);
app.use("/committee-member" , committeeMemberRoute);
app.use("/event" , eventRoute);
app.use("/department" , departmentRoute);

//launching the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000\nhttp://localhost:3000`);
});
