// authService/src/services/userServiceProxy.ts
import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_BASE || 'http://1960market-user_service-1:3001/users';

// Verifies user credentials by calling the user service
export const verifyUserCredentials = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/verifyCredentials`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error communicating with user service:');
    return null;
  }
};

// Fetch user by ID from the user service
export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error communicating with user service:', error);
    return null;
  }
};

// Find or create a user in the user service based on Google profile
export const getUserByGoogleIdOrCreate = async (profile: any) => {
    try {
      // Sending Google profile information to user service
      const userResponse = await axios.post(`${USER_SERVICE_URL}/google-auth`, {
        email: profile.emails?.[0]?.value,
        firstname: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        googleId: profile.id,
      });
      const user = userResponse.data;

      // Pass the user data (from user service) to the next middleware
      return user;
    } catch (error) {
      console.error('Error communicating with user service:', error);
      throw new Error('Error communicating with user service');
    }
};