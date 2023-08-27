const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Generate password hash
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(422).json({
      errors: ["This email already in use, please use another."],
    });
    return;
  }

  // Generate passwordHash
  const passwordHash = await encryptPassword(password);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });
  console.log("New user: ", newUser);

  // If user was not created successfully, return error
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["An error has occurred. Please try again later."] });
    return;
  }
  // If user was created successfully, return token
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// User sign in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["User not found."] });
    return;
  }

  // Check if password user matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Wrong password, please try again."] });
    return;
  }

  // Return user connected successfully with token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

// Update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  // Converting mongoose type string and remove -password
  console.log("Chegou o req.user:", req.user.profileImage);
  const reqUser = req.user;
  const user = await User.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    const passwordHash = await encryptPassword(password);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    // Check if user exists
    if (!user) {
      res.status(404).json({ errors: ["User not found!"] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["User not found!"] });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
