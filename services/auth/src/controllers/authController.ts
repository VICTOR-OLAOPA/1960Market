import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
// Base url for user service
const USER_SERVICE_URL = process.env.USER_SERVICE_BASE || 'http://1960market-user_service-1:3001/api/user';

// Register a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const response = await axios.post(`${USER_SERVICE_URL}/register`, {
      firstname,
      lastname,
      email,
      password
    });

    const { user } = response.data;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(201).json({
      message: 'Registration successful!',
      user,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
      console.error('Error during user registration:', error);
      return res.status(error.response.status).json({ message: error.response.data.message });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      console.error('Error during user login:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      // Authentication failed, send appropriate error
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // const userResponseDTO = plainToClass(UserResponseDTO, user, { excludeExtraneousValues: true });
    // const response = instanceToPlain(userResponseDTO);

      // Login successful, return user info
      return res.status(200).json({
        message: 'Login successful!',
        user: user,
        accessToken,
        refreshToken
      });
    });
  })(req, res, next);
};