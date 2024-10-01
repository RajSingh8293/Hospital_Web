import User from "../models/user.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { generateToken } from "../utils/generateToken.js";
import { authHashPassword, comparePassword } from "../utils/passwordHandler.js";
import { sendResponse } from "../utils/sendResponse.js";

// delete all users
export const deleteAllUsers = asyncHandler(async (req, res) => {
  const user = await User.deleteMany({});
  if (!user) {
    res.status(400).json({
      success: false,
      message: "User not deleted",
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Users deleted Successfully",
  });
});
// register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username) {
    return res.status(422).json({ message: "Username is required !" });
  }
  if (!email) {
    return res.status(422).json({ message: "Email is required !" });
  }
  if (!password) {
    return res.status(422).json({ message: "Password is required !" });
  }
  if (!role) {
    return res.status(422).json({ message: "Role is required !" });
  }

  // existing user
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists !" });
  }

  // password hash
  const hashPassword = authHashPassword(password);

  const userdata = new User({
    username,
    email,
    password: hashPassword,
    role,
  });

  const user = await userdata.save();

  sendResponse(res, user, 201, "User register Successfully");
});

// login user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!password) {
    return res
      .status(404)
      .json({ success: false, message: "Password is required !" });
  }
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Email is required !" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send({
      success: false,
      message: "User does not exists",
    });
  }

  // const isMatch = bcryptjs.compareSync(password, user.password);
  const isMatch = comparePassword(password, user.password);
  if (!isMatch) {
    res.status(400).send({
      success: false,
      message: "Invalid data !",
    });
    // return next(new ErrorHandler("Invalid data", 400));
  }

  sendResponse(res, user, 200, "User log in Successfully");
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res.status(200).clearCookie("token", options).json({
    success: true,
    message: "User logged Out",
  });
});

// profile
export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id).select("-password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
    // return next(new ErrorHandler("User not found", 400));
  }

  res.status(200).json({
    success: true,
    message: "User found successfully",
    user,
  });
});

// update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const userUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
          email,
        },
      },
      { new: true }
    );

    sendResponse(res, userUpdate, 200, "User updated successfully");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
});

// delete account himself user
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    await deleteOnCloudinary(user?.profileImage?.public_id);
    await User.findByIdAndDelete(user);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

// update profile image
export const updateProfileImage = async (req, res) => {
  try {
    let user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const filename = req.file?.path;
    await deleteOnCloudinary(user?.profileImage?.public_id);

    const image = await uploadOnCloudinary(filename);

    const userUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          profileImage: {
            public_id: image.public_id,
            url: image.url,
          },
        },
      },
      { new: true }
    );

    // return res.status(200).json({
    //   success: true,
    //   message: "Profile image updated successfully",
    //   user: userUpdate,
    // });

    sendResponse(res, userUpdate, 200, "User image updated successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
};

// change password
export const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  // const isPasswordCorrect = bcryptjs.compareSync(oldPassword, user.password);
  const isPasswordCorrect = comparePassword(oldPassword, user.password);
  console.log("user :", user);

  if (!isPasswordCorrect) {
    res.status(400).json({
      success: false,
      message: "Password incorrect!",
    });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  sendResponse(res, user, 200, "Password changed successfully");
};

// delete user account by admin
export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log("user :", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    await deleteOnCloudinary(user?.profileImage?.public_id);
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "User deleted successfully",
      deleteUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

// admin get users
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).json({
        success: false,
        message: "Data not found",
      });
      return;
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
};

// get user account by id admin
export const getUserAccountById = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  return res.status(200).json({
    success: true,
    message: "User successfully",
    user,
  });
};
