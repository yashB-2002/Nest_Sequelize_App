import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';
import { UserPermission } from './user_permission.entity';
import { PermissionDTO } from './dto/permission.dto';
import { AddUserPermissionDTO } from './dto/addUserPermission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async createPermission(@Body() createPermissionDto: PermissionDTO): Promise<Permission> {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Get()
  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionsService.findAllPermissions();
  }

  @Post(':userId/permissions')
  async addUserPermissions(
    @Param('userId') userId: number,
    @Body('permissions') permissions: { permissionId: number, permissionName: string }[],
  ):Promise<UserPermission[]> {
    return this.permissionsService.addUserPermissions(userId, permissions);
  }

  // @Post('/add-user-permission')
  // async addUserPermission(@Body() addUserPermissionDto: AddUserPermissionDTO): Promise<UserPermission> {
  //   const { userId, permissionId, permissionName } = addUserPermissionDto;
  //   return this.permissionsService.addUserPermission(userId, permissionId, permissionName);
  // }
}
