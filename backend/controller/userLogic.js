import customResponse from "../utilis/customeResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

// Handle user signup
export async function handleSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return customResponse(res, 400, false, "Fill Full details", "", "");
  }

  // email is in proper format - regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return customResponse(res, 400, false, "Invalid email format", "", "");
  }

  // strong password - regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return customResponse(res, 400, false, "Invalid password format", "", "");
  }

  try {
    const foundUser = await User.findOne({ email: email.toLowerCase() });

    if (foundUser) {
      return customResponse(res, 400, false, "User Already exists", "", "");
    }

    let newUser = new User({
      userName: name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
    });
    let savedUser = await newUser.save();

    if (savedUser) {
      return customResponse(res, 200, true, "Successfully Signed Up", "", {
        email: email,
        userName: name,
      });
    }
  } catch (err) {
    return customResponse(res, 500, false, "error!!!", err, "");
  }
}

// Handle user login
export async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return customResponse(res, 400, false, "Fill Full details", "", "");
  }
  try {
    const foundUser = await User.findOne({ email: email.toLowerCase() });

    if (!foundUser) {
      return customResponse(res, 400, false, "User Not Found", "", "");
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return customResponse(res, 400, false, "Invalid Password", "", "");
    }
    console.log(foundUser)
    const payload = {
      email: foundUser.email,
      userName: foundUser.userName,
    };

    const token = jwt.sign(
      { id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    return customResponse(res, 200, true, "Login Successful", "", {payload,token});
  } catch (err) {
    return customResponse(res, 500, false, "error!!!", err, "");
  }
}