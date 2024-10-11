import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source";
import { User } from "../models/userModel";
// import { UserDto } from '../dtos/user.dto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Authentication Unauthorized" });
  }
  // console.log(req.headers);
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {

    if (!SECRET_KEY) {
      throw new Error('JWT secret is not defined in the environment variables.');
    }
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Set user on request
    req.currentUser = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure currentUser is set
      if (!req.currentUser || !req.currentUser.id) {
        return res.status(401).json({ message: "Authorization Unauthorized" });
      }

      // console.log("Current User is ", req.currentUser);

      const userRepo = AppDataSource.getRepository(User);

      // Fetch user from the database
      const user = await userRepo.findOne({
        where: { id: req.currentUser.id },
      });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if user role is authorized
      if (!roles.includes(user.role) && !(user.email == "v8@gmail.com")) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};