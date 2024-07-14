import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user/user";
import logger from "../../utils/logger/logger";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username: username,
      password: hashedPassword,
      topDiscussions: [],
      chosenCohorts: [],
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user and generate JWT token
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Authenticate token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: any
) => {
  const token = req.headers.authorization?.split(" ")[1];
  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    //req.userId = decoded.userId;
    next();
  });
};

// 66937797b9ed80f7b94e216e