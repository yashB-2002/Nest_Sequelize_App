// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe, SetMetadata, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { PermissionsGuard } from 'src/permissions/permission.guard';
import { BooleanField } from './validators/boolean.decorator';
import { ParseBooleanPipe } from './validators/boolean-pipe';
import { PathParamsDto } from './dto/PathParamsDTO';
import { QueryDto } from './dto/Query.dto';
import { TimingInterceptor } from './validators/controller.interceptor';
import { CustomParseIntPipe } from './validators/IdValidation.pipe';
import { CacheInterceptor } from '../cache.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: UserDTO): Promise<User> {
    console.log('isActive:',typeof createUserDto.isActive, createUserDto.isActive);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @UseInterceptors(CacheInterceptor)
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard,PermissionsGuard)
  @SetMetadata('permissions', ['GET_USER'])
  @UseInterceptors(TimingInterceptor)
  @UsePipes(CustomParseIntPipe)
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<UserDTO>): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,PermissionsGuard)
  @SetMetadata('permissions', ['DELETE_USER'])
  
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  // @Post(':userId/permissions/:permissionId')
  // async addPermissionToUser(@Param('userId',ParseIntPipe) userId: number, @Param('permissionId',ParseIntPipe) permissionId: number, @Body('permissionName') permissionName: string) {
  //   return this.usersService.addPermissionToUser(userId, permissionId, permissionName);
  // }

  // @Post('check')
  // checkBooleanWithDecorator(isActive: boolean) {
  //   console.log(typeof isActive, isActive); 
  //   return { isActive };
  // }


  // @Post(':isActive')
  // getUserByStatus(@Param() params: PathParamsDto) {
  //   console.log('isActive:', params.isActive); 
  //   return params;
  // }


  // @Post('check')
  //   checkMultipleBooleansBody(
  //     @Body('isActive', BooleanPipe) isActive: boolean,
  //     @Body('isVerified', BooleanPipe) isVerified: boolean
  //   ) {
  //     console.log(typeof isActive, typeof isVerified)
  //     return { isActive, isVerified };
  //   }

  // @Get('/checkk')
  // getUsers(@Query() queryDto: QueryDto) {
    
  //   console.log('isActive:', queryDto.isActive);
    
  //   return queryDto;
  // }



}
