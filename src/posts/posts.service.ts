import { Injectable } from '@nestjs/common';
import { PostsRepository } from './post.repository';
import { Post } from './post.entity';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(post: Partial<Post>): Promise<Post> {
    return this.postsRepository.createPost(post);
  }

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.findAllPosts();
  }

  async findPostById(id: number): Promise<Post> {
    return this.postsRepository.findPostById(id);
  }

  async updatePost(id: number, post: Partial<PostDTO>): Promise<Post> {
    const [_, updatedPost] = await this.postsRepository.updatePost(id, post);
    return updatedPost[0];
  }

  async deletePost(id: number): Promise<void> {
    return this.postsRepository.deletePost(id);
  }
}
