// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PermissionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
