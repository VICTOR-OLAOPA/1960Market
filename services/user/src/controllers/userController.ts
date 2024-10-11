import { Request, Response } from 'express';
const passport = require('passport');
import { User, UserRole } from '../models/userModel'; // Assuming you're using TypeORM
import { encrypt } from '../helpers/encrypt';
import { UserResponseDTO } from '../dtos/user.dto';
import { plainToClass, plainToInstance, instanceToPlain } from 'class-transformer';
import bcrypt from 'bcryptjs';
import { AppDataSource } from "../data-source";
import dotenv from 'dotenv';

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

// Register a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await encrypt.encryptpass(password, 10);

    // Create new user
    const newUser = userRepository.create({
      firstname,
      lastname,
      email, 
      password: hashedPassword,
    });

    const savedUser = await userRepository.save(newUser);
    
    // console.log('User object before transformation:', savedUser);

    // Transform user entity to UserResponseDTO
    const userResponseDTO = plainToInstance(UserResponseDTO, savedUser, { excludeExtraneousValues: true });

    // Convert DTO to plain object to properly serialize getters like 'getFullName'
    const response = instanceToPlain(userResponseDTO);

    // console.log('User object after transformation:', userResponseDTO);

    // const token = encrypt.generateToken({ id: newUser.id });

    res.status(201).json({
      message: 'User registered successfully!',
      user: response,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const googleLogin = async (req: Request, res: Response) => {
  const { googleId, email, firstname, lastname } = req.body;

  try{
    // Check if user with the Google ID already exists
    let user = await userRepository.findOne({
      where: { googleId },
    });

    if (!user) {
      // Create a new user if it doesn't exist
      const user = userRepository.create({
        email: email,
        firstname: firstname,
        lastname: lastname,
        googleId: googleId,
      });

      await userRepository.save(user);
    }

    // Send the user data back to the auth service
    return res.json(user);
    
  } catch (error) {
    res.status(500).json({ message: 'Error logging in with Google' });
  }
};

// To be called from th auth service to verify user credentials like email and password when logging in
export const verifyCredentials = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Fetch user by email
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  // If no such email exists or password for email is wrong
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json(user); // Send user data back to auth service
}

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get the repository for the User entity
    const userRepository = AppDataSource.getRepository(User);

    // Find user by ID
    const user = await userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResponseDTO = plainToClass(UserResponseDTO, user, { excludeExtraneousValues: true });
    res.status(200).json(userResponseDTO);
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching user:', err.message);
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Update user
export const updateUserRole = async (req: Request, res: Response) => {
  const id = req.params.id;
  const newRole = req.body.role;

  // Validate the userId is a number (if it's a number)
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  // Ensure you are getting the enum values correctly
  const validRoles = Object.values(UserRole);

  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role value' });
  }

  console.log('Received role:', newRole);
  console.log('Valid roles:', validRoles);

  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: Number(id) } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = newRole;

    await userRepository.save(user);

    return res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params;

  try {
    const user = await User.findOne(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
