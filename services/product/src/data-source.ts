// src/data-source.ts
import { DataSource } from 'typeorm';
import { Product } from './models/productModel';
import { ProductImage } from './models/productImage';

export const AppDataSource = new DataSource({
  type: 'mysql', // or your preferred DBMS
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Don't use `true` in production
  logging: process.env.NODE_ENV === "dev" ? false : false,
  entities: [Product, ProductImage], // Add other entities here
  migrations: [],
  subscribers: [],
  extra: {
    authPlugins: {
      mysql_native_password: true,  // Add this line to use native password
    }
  }
});

// Initialize the DataSource
AppDataSource.initialize()
  .then(() => {
    console.log('Product Service Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

  export default AppDataSource;