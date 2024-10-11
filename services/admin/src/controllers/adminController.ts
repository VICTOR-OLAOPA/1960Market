// // src/controllers/adminController.ts
// import { Request, Response } from 'express';
// import { AppDataSource } from '../data-source';
// // import { User } from '../../../user/src/models/userModel';

// export const updateUserRole = async (req: Request, res: Response) => {
//   const { userId, role } = req.body;

//   try {
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOneBy({ id: userId });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.role = role;
//     await userRepository.save(user);

//     return res.status(200).json({ message: 'User role updated successfully', user });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error updating user role', error });
//   }
// };

// // Other admin-related controllers can be added here...
