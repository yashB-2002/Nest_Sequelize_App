import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.entity';
import { User } from 'src/users/user.entity';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post) private readonly postModel: typeof Post,
  ) {}

  async createPost(post: Partial<Post>): Promise<Post> {
    return await this.postModel.create(post);
  }

  async findAllPosts(): Promise<Post[]> {
    return await this.postModel.findAll({ include: [User] });
  }

  async findPostById(id: number): Promise<Post> {
    return await this.postModel.findOne({ where: { id }, include: [User] });
  }

  async updatePost(id: number, post: Partial<PostDTO>): Promise<[number, Post[]]> {
    return await this.postModel.update(post, { where: { id }, returning: true });
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.findPostById(id);
    await post.destroy();
  }
}
