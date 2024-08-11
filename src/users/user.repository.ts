import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    return await this.userModel.create(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.findAll({ include: [Post] });
  }

  async findUserById(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id }, include: [Post] });
  }

  async findByEmail(email:string):Promise<User> {
    return this.userModel.findOne({
      where:{
        email:email
      }
    })
  }

  async updateUser(id: number, user: Partial<User>): Promise<[number, User[]]> {
    return await this.userModel.update(user, { where: { id }, returning: true });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await user.destroy();
  }
}
