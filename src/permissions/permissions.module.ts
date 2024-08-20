// src/permissions/permissions.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './permission.repository';
import { Permission } from './permission.entity';
import { UserPermission } from './user_permission.entity';
import { PermissionsController } from './permissions.controller';
import { LoggerService } from 'src/logger/logger.service';

// {
//   imports: [SequelizeModule.forFeature([Permission, UserPermission])],
//   providers: [PermissionsService, PermissionsRepository],
//   controllers: [PermissionsController],
//   exports: [PermissionsService],
// }
@Module({})
export class PermissionsModule {
  static forRoot(config: { entities?: any[]; logging?: boolean,notificationType?: 'email' | 'console' } = {}): DynamicModule {
    const entities = config.entities || [Permission, UserPermission];
    const providers: Provider[] = [
      PermissionsService,
      PermissionsRepository,
    ];
    if (config.logging) {
      providers.push(LoggerService);  
    }
    return {
      module: PermissionsModule,
      imports: [SequelizeModule.forFeature(entities)],
      providers: providers,
      controllers: [PermissionsController],
      exports: [PermissionsService],
    };
  }
}
