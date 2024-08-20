import { Controller, Get, Post, Body, Param, Put, Delete, Res, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDTO } from './dto/post.dto';
import { Response } from 'express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { CacheInterceptor } from 'src/cache.interceptor';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
@UseInterceptors(FileInterceptor('fileName', {
  storage: diskStorage({
    destination: './uploads',
    filename: (_, file, callback) => {
      const fileExtName = extname(file.originalname);
      const randomName = (Math.round(Math.random() * 16))
      console.log(`Saving file as: ${randomName}${fileExtName}`);
      callback(null, `Image-${randomName}${fileExtName}`);
    },
  }),
}))
async createPost(
  @Body('title') title: string,
  @Body('content') content: string,
  @Body('userId', ParseIntPipe) userId: number,
  @UploadedFile() file: Express.Multer.File,
): Promise<PostEntity> {
  // console.log('Uploaded file:', file);
  const postDto: PostDTO = {
    title,
    content,
    userId,
  };

  if (file) {
    postDto.fileName = file.filename;
  }

  return this.postsService.createPost(postDto);
}

  @Get(':id')
  async findPostById(@Param('id') id: number, @Res({ passthrough: true }) res: Response): Promise<PostEntity> {
    const post = await this.postsService.findPostById(id);
    const NOT_FOUND_STATUS_CODE = 404;
    if (!post) {
      res.statusCode = NOT_FOUND_STATUS_CODE;
    }

    return post;
  }

  @Get('uploads/:fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    path.join(__dirname , "./uploads/" + fileName)
  }

  @Get()
  async findAllPosts(): Promise<PostEntity[]> {
    return this.postsService.findAllPosts();
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
