import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from './permissions/permission.entity';
import { UserPermission } from './permissions/user_permission.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'name',
      password: "pwd",
      database: 'userscrud',
      models: [User,Post,Permission,UserPermission],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule, 
    PostsModule, 
    AuthModule, 
    PermissionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
