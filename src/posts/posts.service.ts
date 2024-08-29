import { Injectable } from '@nestjs/common';
import { PostsRepository } from './post.repository';
import { Post } from './post.entity';
import { PostDTO } from './dto/post.dto';
import { AuditService } from 'src/audit-log/audit-log.service';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository,
    private readonly auditService: AuditService,
  ) {}

  async createPost(post: Partial<Post>): Promise<Post> {
    // return this.postsRepository.createPost(post);
    const newPost = await this.postsRepository.createPost(post);
    await this.auditService.logChange(
      'Post',
      newPost.id,
      'CREATE',
      [],
      post.userId,
    );
    return newPost;
  }

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.findAllPosts();
  }

  async findPostById(id: number): Promise<Post> {
    return this.postsRepository.findPostById(id);
  }

  async updatePost(id: number, post: Partial<PostDTO>): Promise<Post> {
    const existingPost = await this.postsRepository.findPostById(id);
    console.log("post found",existingPost);
    console.log("new post ",post);
    
    const [_, updatedPost] = await this.postsRepository.updatePost(id, post);
    console.log("new updatedpost",updatedPost);
    let changes = [];
    changes = Object.keys(post).map((field)=>{
      return {
        fieldName: field,
        oldValue: existingPost[field],
        newValue:post[field]
      }
    })
    
    console.log('User ID:', post.userId);
    const userId = post.userId || existingPost.userId;
    if (!userId) {
      throw new Error('User ID is missing for audit log');
    }
    await this.auditService.logChange(
      'Put',
       id,
      'UPDATE',
      changes,
      userId,
    );
    console.log(updatedPost);
    
    return updatedPost[0];
  }

  async deletePost(id: number): Promise<void> {
    const postToBeDeleted = await this.postsRepository.findPostById(id);
    await this.postsRepository.deletePost(id);

    await this.auditService.logChange(
      'Post',
      id,
      'DELETE',
      [],
      postToBeDeleted.userId,
    );
  }
}
