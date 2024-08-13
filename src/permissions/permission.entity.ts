// src/permissions/permission.entity.ts
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { UserPermission } from './user_permission.entity';

@Table
export class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ unique: true })
  name: string;

  @BelongsToMany(() => User, () => UserPermission)
  users: User[];
}
