import { Request } from 'express';
import { User as CustomUser } from './User'; 

export interface CustomRequest extends Request {
  currentUser?: CustomUser; // 'user' property based on the local 'User' interface
}
