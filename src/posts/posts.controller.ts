import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDTO } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: PostDTO): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  async findAllPosts(): Promise<PostEntity[]> {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  async findPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findPostById(id);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() updatePostDto: Partial<PostDTO>): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
