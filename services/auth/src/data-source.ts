// // src/data-source.ts
// import { DataSource } from 'typeorm';
// import { User } from './models/userModel'; // Adjust the path if needed

// export const AppDataSource = new DataSource({
//   type: 'mysql', // or your preferred DBMS
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true, // Don't use `true` in production
//   logging: process.env.NODE_ENV === "dev" ? false : false,
//   entities: [User], // Add other entities here
//   migrations: [],
//   subscribers: [],
// });

// // Initialize the DataSource
// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//   });

//   export default AppDataSource;