import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import { createUser, CreateUser, getUserByEmail } from "../queries/user";
import { User } from "@prisma/client";
import { getEnv } from "../utils";

const router = express.Router();
router.use(cookieParser());

router.get("/", async (req: Request, res: Response) => {
  return res.json(req.user);
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const user: User | null = await getUserByEmail(email);
  if (!user) return res.status(400).send("Invalid Email/Password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email/Password");

  const token = jwt.sign({ id: user.id }, getEnv("JWT_SECRET"), {
    expiresIn: "1h",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: getEnv("NODE_ENV") === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });

  res.send("Logged in successfully");
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password || !firstName) {
      return res
        .status(400)
        .send("Email, password, and first name are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_])[A-Za-z\d@$!%*?&#\-_]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .send(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#-_)"
        );
    }
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const data: CreateUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    // Save user to database (mock implementation)
    const user = await createUser(data);

    // Create and send JWT
    const token = jwt.sign(
      { id: user.id },
      getEnv("JWT_SECRET") as string,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(201).send("User created successfully");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
