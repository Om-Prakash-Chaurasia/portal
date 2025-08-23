const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and Password are required." });

  try {
    // check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // check password
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate jwt token
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    const token = generateToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error: ", error.message);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res
      .status(400)
      .json({ msg: "Please enter all the required fields" });

  try {
    // check if user already exists
    let existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();

    // generate jwt token
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    const token = generateToken(payload);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration Error: ", error.message);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

module.exports = { loginUser, registerUser };
