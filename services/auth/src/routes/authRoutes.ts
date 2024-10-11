import { Router } from 'express';
import passport from 'passport';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import { validateLoginInput, validateRegisterInput } from '../middleware/validation';
import { createUser, loginUser } from '../controllers/authController';


const router = Router();

// Route for registering a new user
router.post('/register', validateRegisterInput, createUser);

// Route for registering a new user
router.post('/login', validateLoginInput, loginUser);

// Route to initiate Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // On successful login, issue JWT token to the user
  const user = req.user;

  // Generate JWT
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  
  // Send tokens and user info as response
  res.json({
    message: 'Google login successful',
    user,
    accessToken,
    refreshToken,
  });
});

export default router;
