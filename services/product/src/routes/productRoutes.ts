import { Router } from 'express';
import { checkAuth, authorization } from '../middlewares/authMiddleware';
import { addProduct } from '../controllers/productController';
import passport from 'passport';
const router = Router();


// Route for uploading a product
router.post('/addProduct', passport.authenticate('jwt', { session: false }), checkAuth, authorization(["admin", "buyer", "seller", "serviceprovider"]),  addProduct);


export default router;
