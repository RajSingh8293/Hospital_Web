import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    console.log("token ", token);
    if (!token) {
      res.status(400).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken?._id);
    req.user = user;
    next();
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Something went wrong please try after sometime",
    });
  }
};

export const recruiterAuth = (req, res, next) => {
  try {
    // if (req.user && req.user.role === 'admin') {
    if (req.user && req.user?.role == "recruiter") {
      return next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(501)
      .json({ success: false, message: "Your are not able to get this page" });
  }
};
