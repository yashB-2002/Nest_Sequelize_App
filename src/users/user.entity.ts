// src/users/user.entity.ts
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany, BeforeSave, BelongsToMany } from 'sequelize-typescript';
import { Post } from 'src/posts/post.entity';
import * as bcrypt from 'bcrypt';
import { Permission } from 'src/permissions/permission.entity';
import { UserPermission } from 'src/permissions/user_permission.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column(DataType.ARRAY(DataType.STRING))
  hobbies: string[];

  @Column
  gender: string;

  @Column
  role: string;

  @Column
  age: number;

  @Column
  phonenumber: string;

  @Column(DataType.JSONB)
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    pincode: string;
  };

  @Column
  password: string;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }

  @HasMany(() => Post)
  posts: Post[];

  @BelongsToMany(() => Permission, () => UserPermission)
  permissions: Permission[];
}
