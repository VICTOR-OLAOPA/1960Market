export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  googleId: string;  // For Google OAuth ID
  role: string;
}