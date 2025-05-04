import User from "../Models/users.models.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import generatetoken from "../jwt/token.js";

// Schema validation using Zod
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must not exceed 10 characters" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" })
    .max(10, { message: "Username must not exceed 10 characters" }),
});

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const validation = userSchema.safeParse({ username, password, email });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(400).json({ errors: "This email is already registered" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = new User({ username, password: hashpassword, email });

    await newuser.save();

    if (newuser) {
      const token = await generatetoken(newuser._id, res);
      res.status(200).json({
        message: "User registered successfully",
        newuser,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      errors: "Unable to register new user",
    });
  }
};

// Sign in an existing user
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const checkuser = await User.findOne({ email }).select("+password");

    if (!checkuser || !(await bcrypt.compare(password, checkuser.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    const token = await generatetoken(checkuser._id, res);

    res.status(200).json({
      message: "Successfully logged in",
      checkuser,
    });
  } catch (error) {
    res.status(400).json({
      errors: "Unable to sign in",
    });
  }
};

// Logout user
const logOUT = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ errors: "Unable to log out" });
  }
};

export { registerUser, signIn, logOUT };
