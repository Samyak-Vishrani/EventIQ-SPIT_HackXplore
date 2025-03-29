import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
async function authmiddleware(req, res, next) {
  const value = req.header('Authorization');
  
  if (!value) {
    return res.status(403).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Extract the token from the 'Bearer' scheme
    const bearer = value.split(" ");
    const token = bearer[1];

    if (!token) {
      return res.status(403).json({ message: 'Token missing, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the decoded token to req.user for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }

};
export default authmiddleware;