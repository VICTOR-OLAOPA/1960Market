import { Request, Response } from 'express';
import { getSellerDetails } from '../services/userServiceProxy'; 
import { Product } from '../models/productModel';
import { ProductImage } from '../models/productImage';
import { AppDataSource } from "../data-source";
import { CustomRequest } from '../types/express';
import { Seller } from '../types/Seller';


const productRepository = AppDataSource.getRepository(Product);
const productImageRepository = AppDataSource.getRepository(ProductImage);

export const addProduct = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      price,
      stockLevel,
      category,
      images,
    } = req.body;

    // Extract the token from the Authorization header
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No access token provided' });
      return;
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token part
    if (!token) {
      res.status(401).json({ message: 'Authorization token missing' });
      return;
    }

    const seller: Seller | null = await getSellerDetails(req.currentUser!.id, token);
    if (!seller) {
      res.status(404).json({ message: 'Seller not found' });
      return;
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.stockLevel = stockLevel;
    product.category = category;
    product.seller = seller.id;

    // Save Product first
    const savedProduct = await productRepository.save(product);

    // Save images if provided
    let savedImages: ProductImage[] = [];
    if (images && images.length > 0) {
      const productImages = images.map((imageUrl: string) => {
      const productImage = new ProductImage();
      productImage.imageUrl = imageUrl;
      productImage.product = savedProduct;
      return productImage;
    });
      savedImages = await productImageRepository.save(productImages);
    }

    res.status(201).json(
      {
        message: "Product Upload Successful!",
        product: savedProduct,
        images: savedImages,
        
      }
    );
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
