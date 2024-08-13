// src/permissions/permissions.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './permission.repository';
import { Permission } from './permission.entity';
import { UserPermission } from './user_permission.entity';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [SequelizeModule.forFeature([Permission, UserPermission])],
  providers: [PermissionsService, PermissionsRepository],
  controllers: [PermissionsController],
  exports: [PermissionsService],
})
export class PermissionsModule {}
