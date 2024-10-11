import { User as CustomUser } from '../models/userModel'; 

declare global {
  namespace Express {
    interface Request {
      currentUser?: CustomUser;
    }
  }
}
