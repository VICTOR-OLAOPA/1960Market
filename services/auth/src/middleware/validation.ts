import { Request, Response, NextFunction } from 'express';

// Middleware for validating user input for registration
export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields.' });
  }

  // Optionally, add more validation rules here (e.g., password strength, email format)

  next();
};

// Middleware for validating user input for login
export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  // Optionally, add more validation rules here (e.g., email format)

  next();
};
