import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // VALIDATE FIELDS
  if (!(firstName || lastName || email || password)) {
    next("Please provide the required fields");
    return;
  }
  try {
    const userExist = await Users.findOne({ email });
    if (userExist) {
      next("Email Address already exists");
      return;
    }
    const hashedPassword = await hashString(password);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //send email verification to user
    sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // VALIDATION
    if (!email || !password) {
      next("Please provide the required fields");
      return;
    }

    // FIND USER BY EMAIL
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });

    if (!user) {
      next("Invalid Credentials");
      return;
    }

    if (!user?.verified) {
      next(
        "User email has not been verified. Check your email and verify your email address"
      );
      return;
    }

    // COMPARE PASSWORD
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid Credentials");
      return;
    }

    user.password = undefined;

    // CREATE JWT TOKEN
    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login was successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
