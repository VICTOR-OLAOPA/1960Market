// src/routes/adminRoutes.ts
import express from 'express';
import { updateUserRole } from '../controllers/adminController';

const router = express.Router();

// Update user role
router.put('/user/role', updateUserRole);

// Other admin routes...

export default router;
