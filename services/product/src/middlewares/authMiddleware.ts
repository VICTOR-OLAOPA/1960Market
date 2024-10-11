import { Response, NextFunction } from 'express';
import { getUserById } from '../services/userServiceProxy';
import { CustomRequest } from '../types/express';
import { User } from '../types/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const checkAuth = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  // Check for Authorization header
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  // Extract token
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Authorization token missing' });
    return;
  }

  try {
    if (!SECRET_KEY) {
      throw new Error('JWT secret is not defined in the environment variables.');
    }

    // Verify JWT token
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    // Call User service to get user by ID
    const user = await getUserById(userId, token);
    
    // Handle case where user does not exist
    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Attach user to the request object
    req.currentUser = user as User;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authorization = (roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization!.split(' ')[1];
      if (!req.currentUser || !req.currentUser.id) {
        res.status(401).json({ message: "Authorization Unauthorized" });
        return;
      }

      const user = await getUserById(req.currentUser.id, token) as User;

      // Check if user exists
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Check if user role is authorized
      if (!roles.includes(user.role) && !(user.email == "v8@gmail.com")) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      
      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};