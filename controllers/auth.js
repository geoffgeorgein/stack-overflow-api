import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }
    console.log("sign-up")
  

    const hashedPassword = await bcrypt.hashSync(password, 12);
    console.log(name,email,password,hashedPassword)

    try{
      const newUser = await users.create({
        name:name,
        email:email,
        password: hashedPassword,
      });
    }
    catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
    
    console.log(newUser)
    console.log("sign-up2")
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } 
    catch (error) {
      res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};