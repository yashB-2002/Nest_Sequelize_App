// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { CacheService } from '../cache.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PermissionsModule.forRoot(),
  ],
  controllers: [UsersController],
  providers: [CacheService,UsersService, UsersRepository],
  exports: [CacheService, UsersService],
})
export class UsersModule {}
