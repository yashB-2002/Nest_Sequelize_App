// src/audit-log/entity/audit-log-detail.entity.ts
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { AuditLogHeader } from './AuditlogHeader';

@Table
export class AuditLogDetail extends Model<AuditLogDetail> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => AuditLogHeader)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  auditLogHeaderId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fieldName: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  oldValue: any;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  newValue: any;
}
