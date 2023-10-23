import UserModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered. Please log in instead.",
      });
    }

    const otp = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      specialChars: false,
    });

    const user = await new UserModel({
      name,
      email,
      password,
      otp,
    }).save();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: email, // Replace with your email address
        pass: password, // Replace with your email app-specific password
      },
    });

    const mailOptions = {
      from: "ravi@gmail.com", // Replace with your email address
      to: email,
      subject: "OTP for Registration",
      text: `Your OTP for registration is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: " + error);
        // Handle the email sending error
        res.status(500).send({
          success: false,
          message: "Error sending email",
          error,
        });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).send({
          success: true,
          message: "User saved successfully. Check your email for OTP.",
          user,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Find the user with the provided email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please register." });
    }

    // Verify the provided password against the user's stored password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Verify the provided OTP against the user's stored OTP
    if (user.otp !== otp) {
      return res
        .status(401)
        .json({ message: "Invalid OTP. Please check your email for the OTP." });
    }

    // Clear the OTP after successful login (optional)
    user.otp = null;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user,
      // token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
