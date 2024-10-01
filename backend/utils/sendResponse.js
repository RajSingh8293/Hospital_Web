import { asyncHandler } from "./asyncHandler.js";
import { generateToken } from "./generateToken.js";

export const sendResponse = (res, user, statusCode, message) => {
  const token = generateToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
    // sameSite: 'None',
    sameSite: 'Strict'
  };
  const { password: pass, ...rest } = user._doc; // hide password
  return res
    .status(statusCode)
    .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 }, options)
    .json({
      success: true,
      message,
      user: rest,
      token,
    });
};
