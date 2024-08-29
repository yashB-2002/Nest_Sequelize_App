import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './post.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuditLogModule } from 'src/audit-log/audit-log.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: './uploads', 
    }),
    SequelizeModule.forFeature([Post]),
    AuditLogModule
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
