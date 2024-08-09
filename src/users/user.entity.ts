import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { Post } from 'src/posts/post.entity';

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

  @HasMany(() => Post)
  posts: Post[];

}
