import axios from 'axios';
import { Seller } from '../types/Seller';

const USER_SERVICE_BASE = process.env.USER_SERVICE_BASE || 'http://1960market-user_service-1:3001/users';

export const getSellerDetails = async (sellerId: number, token: string): Promise<Seller | null> => {
    try {
        const response = await axios.get<Seller>(`${USER_SERVICE_BASE}/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to the headers
          },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching seller details:', error);
        throw error;
    }
}

// Fetch user by ID from the user service
export const getUserById = async (userId: number, token: string) => {
  console.log("Token is: ", token);
    try {
      const response = await axios.get(`${USER_SERVICE_BASE}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the headers
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error communicating with user service:', error);
      throw new Error('Could not fetch user data');
    }
  };