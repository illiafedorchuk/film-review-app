import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./../Users/user"; // Adjust the import path as necessary
import { DeepPartial, getRepository } from "typeorm";
import { iNewUser } from "../Interfaces/types";
import { AppDataSource } from "./../../db/data-source";

const EmailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signup = async (req: Request, res: Response) => {
  const { email, password, nickname, firstName, lastName } = req.body;
  if (!email || !password || !nickname || !firstName || !lastName) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  if (!EmailValidation.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOne({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    email,
    password: hashedPassword,
    nickname,
    firstName,
    lastName,
  } as DeepPartial<iNewUser>); // Explicitly typecast to DeepPartial<User>

  await userRepository.save(newUser);

  return res.status(201).json({ message: "User created successfully." });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const payload = { sub: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "1d",
  });

  res.json({ token });
};
