import { Inject, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { AuditLogHeader } from './entities/AuditlogHeader';
// import { AuditLogDetail } from './entities/AuditLogDetail';
import { KafkaAdapter } from './kafka/kafka.adapter';
import { MessagingAdapter } from './message.adapter';
import { AuditLogHeader } from './entities/AuditlogHeader';
import { InjectModel } from '@nestjs/sequelize';

// @Injectable()
// export class AuditService {
//     constructor(
//         private readonly messagingAdapter: KafkaAdapter,
//       ) {}
    
//       async logChange(
//         tableName: string,
//         rowKey: number,
//         operation: string,
//         changes: { fieldName: string, oldValue: any, newValue: any }[],
//         user: number,
//       ) {
//         await this.messagingAdapter.produceLog(tableName, rowKey, changes, operation, user);
//       }
//     }


@Injectable()
export class AuditService {
  constructor(
    @Inject('MessagingAdapter') private readonly messagingAdapter: MessagingAdapter,
    @InjectModel(AuditLogHeader) private readonly auditLogHeaderModel: typeof AuditLogHeader,
  ) {}

  async logChange(
    tableName: string,
    rowKey: number,
    operation: string,
    changes: { fieldName: string; oldValue: any; newValue: any }[],
    user: number,
  ) {
    await this.messagingAdapter.produceLog(tableName, rowKey, changes, operation, user);
  }

  async getAllAuditLogs() {
    return this.auditLogHeaderModel.findAll({ include: { all: true } });
  }
}

   
   
   
   
    // constructor(
   
    //     @InjectModel(AuditLogHeader) private readonly auditLogHeaderModel: typeof AuditLogHeader,
    //     @InjectModel(AuditLogDetail) private readonly auditLogDetailsModel: typeof AuditLogDetail

    // ) {}

    // async logChange(tableName: string, rowKey: string, operation: string, changes: any, user: string) {
    //     const header = await this.auditLogHeaderModel.create({
    //         tableName,
    //         rowKey,
    //         operation,
    //         changedBy: user,
    //     });

    //     const details = Object.keys(changes).map((columnName) => ({
    //         headerId: header.id,
    //         columnName,
    //         oldValue: changes[columnName].oldValue,
    //         newValue: changes[columnName].newValue,
    //     }));

    //     await this.auditLogDetailsModel.bulkCreate(details);
    // }

