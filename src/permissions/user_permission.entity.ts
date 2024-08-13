import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { Permission } from './permission.entity';
import { IsString } from 'class-validator';

@Table({
  tableName: 'user_permissions',
  indexes: [
    {
      unique:true,
      fields: ['userId', 'permissionId']
    }
  ]
})
export class UserPermission extends Model<UserPermission> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Permission)
  @Column
  permissionId: number;

  @Column
  @IsString()
  permission: string;
}
