const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

// Create User
const createUser = async (req, res) => {
  const { name, email,password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Registered successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed!", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

     const token = jwt.sign(
      { id: existingUser._id, dept: existingUser.dept,email:existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    return res.cookie("uid",token,{
        httpOnly: true,
        secure: true, // true in production
        sameSite: "none", // cross-site in prod
    }).status(200).json({ message: "Login successful!" ,token,dept:existingUser.dept});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed!", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("uid", {
      httpOnly: true,
      secure: false, // set true only in production with HTTPS
      sameSite: "none",
    });

    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed!",
      error: error.message,
    });
  }
};


module.exports = { createUser, loginUser,logoutUser};
