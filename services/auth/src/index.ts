import "reflect-metadata";
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import './config/passport-setup';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './config/swaggerConfig'; // Import the Swagger definition

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
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT} for Auth Service`));
