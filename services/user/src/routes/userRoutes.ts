import { Router } from 'express';
import { createUser, getUserById, deleteUser, updateUserRole, verifyCredentials, googleLogin } from '../controllers/userController';
import { checkAuth, authorization } from '../middlewares/authMiddleware';
import passport from 'passport';
const router = Router();


// Route for registering a new user
router.post('/register', createUser);

router.post('/verifyCredentials', verifyCredentials);

router.post('/google-auth', googleLogin);

// Route for fetching user details (protected route)
router.get('/:id', passport.authenticate('jwt', { session: false }), checkAuth, authorization(["admin", "buyer", "seller", "serviceprovider"]), getUserById);

// Route for updating user information (protected route)
router.put('/updateRole/:id', passport.authenticate('jwt', { session: false }), checkAuth, authorization(["ADMIN"]), updateUserRole);

// Route for deleting a user (protected route)
router.delete('/:id', checkAuth, deleteUser);

export default router;
