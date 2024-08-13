import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './permission.entity';
import { UserPermission } from './user_permission.entity';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectModel(Permission) private readonly permissionModel: typeof Permission,
    @InjectModel(UserPermission) private readonly userPermissionModel: typeof UserPermission,
  ) {}

  async createPermission(permission: Partial<Permission>): Promise<Permission> {
    return this.permissionModel.create(permission);
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionModel.findAll();
  }

  async addUserPermission(
    userId: number,
    permissionId: number,
    permissionName: string,
  ): Promise<UserPermission> {
    console.log('adding UserPermission with data:', {
      userId,
      permissionId,
      permission: permissionName,
    });
  
    try {
      return await this.userPermissionModel.create({
        userId,
        permissionId,
        permission: permissionName,
      });
    } catch (error) {
      console.error('Error creating UserPermission:', error);
      throw error; 
    }
  }
  
}
