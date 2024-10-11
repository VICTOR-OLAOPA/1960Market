import { IsEnum, IsUUID } from 'class-validator';
import { UserRole } from '../models/userModel';

export class UpdateUserRoleDto {
  @IsUUID()
  userId!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
