import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../models/userModel'; // Assuming Role is an enum in User entity

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  firstname!: string;

  @IsString()
  lastname!: string;

  @IsString()
  password!: string;

  @IsEnum(['admin', 'seller', 'buyer', 'serviceprovider'])
  role!: UserRole;
}

export class LoginUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class UserDto {
  @IsUUID()
  id!: number;

  @IsString()
  firstname!: string;

  @IsString()
  lastname!: string;

  @IsEmail()
  email!: string;

  @IsString()
  googleId!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}

export class UserResponseDTO{
  @Expose()
  id!: number;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose({ name: 'fullname' })
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  @Expose()
  email!: string;

  @Expose()
  role!: string;
}