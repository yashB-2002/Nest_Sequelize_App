import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './post.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.entity';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
