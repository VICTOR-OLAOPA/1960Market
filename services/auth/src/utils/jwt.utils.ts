import jwt from 'jsonwebtoken';
import { use } from 'passport';

const SECRET_KEY = process.env.JWT_SECRET || '1960SecretAuth';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '1960RefreshSecret';

// Generate Access Token (short-lived)
export const generateAccessToken = (user: any) => {
    
  return jwt.sign(
    {
      id: user.id,
      email: user.email, // You can add other necessary data here
    },
    SECRET_KEY,
    { expiresIn: '1h' } // Access token expires in 15 minutes
  );
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
    },
    REFRESH_SECRET,
    { expiresIn: '7d' } // Refresh token expires in 7 days
  );
};
