import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionsRepository } from './permission.repository';
import { Permission } from './permission.entity';
import { UserPermission } from './user_permission.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.entity';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository,
    @InjectModel(UserPermission) private readonly userPermissionModel: typeof UserPermission
  ) {}

  async createPermission(permission: Partial<Permission>): Promise<Permission> {
    return this.permissionsRepository.createPermission(permission);
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionsRepository.findAllPermissions();
  }

  async addUserPermissions(
    userId: number,
    permissions: { permissionId: number; permissionName: string }[],
  ): Promise<UserPermission[]> {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    const userPermissions = [];
    for (const permission of permissions) {
      try {
        const userPermission = await this.permissionsRepository.addUserPermission(
          userId,
          permission.permissionId,
          permission.permissionName,
        );
        userPermissions.push(userPermission);
      } catch (error) {
        console.error('Error adding user permission:', error.message);
        throw error;
      }
    }
    return userPermissions;
  }
  
  async getUserPermissions(userId: number): Promise<string[]> {
    const permissions = await this.userPermissionModel.findAll({
      where: { userId  },
      attributes: ['permission'],
    });

    return permissions.map(permission => permission.permission);
  }
}
