import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Emai l is required" });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }

    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already Register please login again",
      });
    }

    // save
    const user = await new userModel({
      name,
      email,
      password,
    }).save();

    res.status(201).send({
      success: true,
      message: "User saved successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
  } catch (error) {}
};
