import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ProductImage } from './productImage';
  
  @Entity('products')
  export class Product {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    seller!: number; //Foreign key to User entity
  
    @Column()
    name!: string;
  
    @Column({ type: 'text', nullable: true })
    description!: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;
  
    @Column({ type: 'int' })
    stockLevel!: number;
  
    @Column({ nullable: true })
    category!: string;
  
    @OneToMany(() => ProductImage, (productImage) => productImage.product, {
      cascade: true,
      eager: true,
    })
    images!: ProductImage[];
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
  }
  