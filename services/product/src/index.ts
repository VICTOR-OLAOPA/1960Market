import "reflect-metadata";
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import './config/passport-setup';

dotenv.config();

const app = express();

// Middleware for session handling
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());



app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use('/products', productRoutes);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT} for Product Service`));
