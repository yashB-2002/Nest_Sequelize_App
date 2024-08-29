import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AuditLogDetail } from './AuditLogDetail';

@Table
export class AuditLogHeader extends Model<AuditLogHeader> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tableName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recordId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  operation: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  performedBy: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  performedAt: Date;

  @HasMany(() => AuditLogDetail)
  details: AuditLogDetail[];
}
