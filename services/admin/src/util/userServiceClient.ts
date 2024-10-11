// src/utils/userServiceClient.ts
import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001/api/user';

// Function to update user role
export const updateUserRole = async (userId: number, role: string) => {
  try {
    const response = await axios.put(`${USER_SERVICE_URL}/role`, { userId, role });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`Failed to update user role: ${error.message}`);
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message: string } } }; // Narrow down further
        throw new Error(`Failed to update user role: ${err.response?.data?.message || 'Unknown error'}`);
      } else {
        throw new Error('Failed to update user role: Unknown error');
      }
  }
};

// Function to fetch user by ID
export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`Failed to fetch user by ID: ${error.message}`);
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message: string } } }; // Narrow down further
        throw new Error(`Failed to fetch user by ID: ${err.response?.data?.message || 'Unknown error'}`);
      } else {
        throw new Error('Failed to fetch user by ID: Unknown error');
      }
  }
};

// Other functions to interact with user microservice...
