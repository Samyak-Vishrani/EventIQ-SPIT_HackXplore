import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const Url = process.env.CONNECTION_URL; 


async function connectMongoDb() {
  mongoose.connect(Url)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
}); 
}
 
export default connectMongoDb;