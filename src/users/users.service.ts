import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: Partial<User>): Promise<User> {
    return this.usersRepository.createUser(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers();
  }

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findUserById(id);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const [_, updatedUser] = await this.usersRepository.updateUser(id, user);
    return updatedUser[0];
  }

  async deleteUser(id: number): Promise<void> {
    return this.usersRepository.deleteUser(id);
  }
}
