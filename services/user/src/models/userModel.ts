import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export enum UserRole {
  ADMIN = "admin",
  SELLER = "seller",
  BUYER = "buyer",
  SERVICEPROVIDER = "serviceprovider"
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  email!: string; //Ensure email is unique

  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: false })
  lastname!: string;
  
  @Column({ unique: true, nullable: true })
  googleId!: string;  // For Google OAuth ID
  
  @Column({ nullable: true })
  password!: string; // Optional, if you want to support both Google OAuth and traditional login

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.BUYER,
    nullable: false
  })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
