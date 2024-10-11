// src/index.ts
import express from 'express';
import { AppDataSource } from './data-source';
import adminRoutes from './routes/adminRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Use admin routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
