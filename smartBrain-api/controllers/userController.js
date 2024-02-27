import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are all required");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    // Handle database errors or other unexpected errors
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Successful authentication
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Authentication failed
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // Validate if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    App Entries
// @route   PUT /api/users/image
// @access  Private
const imageEntry = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Validate if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // If user not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Increment the user's entries
    user.entries++;

    // Save the updated user in the database
    await user.save();

    // Respond with the updated number of entries
    res.json(user.entries);
  } catch (error) {
    // Handle database errors or other unexpected errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { name, password } = req.body;

  // Validate if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // If user not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's name if provided
    if (name) {
      user.name = name;
    }

    // Update user's password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user in the database
    await user.save();

    // Respond with the updated user
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // Handle database errors or other unexpected errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  imageEntry,
  updateUserProfile,
};
