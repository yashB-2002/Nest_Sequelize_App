import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';
import { InjectModel } from '@nestjs/sequelize';
import { AuditLogHeader } from '../entities/AuditlogHeader';
import { AuditLogDetail } from '../entities/AuditLogDetail';
import { MessagingAdapter } from '../message.adapter';


@Injectable()
export class KafkaAdapter implements MessagingAdapter, OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'auditing-log-client',
    brokers: ['localhost:9092'],
    connectionTimeout: 10000,
    logLevel: logLevel.INFO,
  });

  private consumer = this.kafka.consumer({ groupId: 'auditing-log-group' });
  private producer = this.kafka.producer();

  constructor(
    @InjectModel(AuditLogHeader) private auditLogHeaderModel: typeof AuditLogHeader,
    @InjectModel(AuditLogDetail) private auditLogDetailsModel: typeof AuditLogDetail,
  ) {}

  async onModuleInit() {
    await this.producer.connect();
    await this.consumeLogs();  
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }

  async produceLog(
    tableName: string,
    recordId: number,
    changes: any[],
    operation: string,
    userId: number,
  ) {
    console.log(`Producing log for ${tableName} with recordId ${recordId}`);
    await this.producer.send({
      topic: 'auditing-log',
      messages: [
        {
          value: JSON.stringify({
            tableName,
            recordId,
            changes,
            operation,
            userId,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
    console.log('Log produced successfully');
  }

  async consumeLogs() {
    await this.consumer.connect();
    console.log('Consumer connected.');
    await this.consumer.subscribe({ topic: 'auditing-log', fromBeginning: true });
    
    console.log('Subscribed to topic.');

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const log = JSON.parse(message.value.toString());
        console.log(`Consuming log for ${log.tableName} with recordId ${log.recordId}`);
        
        const header = await this.auditLogHeaderModel.create({
          tableName: log.tableName,
          recordId: log.recordId,
          operation: log.operation,
          performedBy: log.userId,
          performedAt: log.timestamp,
        });
        console.log('Header created successfully');

        for (const change of log.changes) {
          await this.auditLogDetailsModel.create({
            auditLogHeaderId: header.id,
            fieldName: change.fieldName,
            oldValue: change.oldValue,
            newValue: change.newValue,
          });
          console.log(`Detail log created for field ${change.fieldName}`);
        }
      },
    });
    console.log('Consumer running');
  }
}


// @Injectable()
// export class KafkaAdapter implements MessagingAdapter {
//   private kafka = new Kafka({
//     clientId: 'auditing-log-client',
//     brokers: ['localhost:9092'],
//     connectionTimeout: 10000,
    // retry: {
    //   retries: 8,
    //   initialRetryTime: 300,
    //   factor: 0.2,
    // },
//     logLevel: logLevel.INFO
//   });

//   private consumer = this.kafka.consumer({ groupId: 'auditing-log-group' });
//   private producer = this.kafka.producer();

//   constructor(
//     @InjectModel(AuditLogHeader) private auditLogHeaderModel: typeof AuditLogHeader,
//     @InjectModel(AuditLogDetail) private auditLogDetailsModel: typeof AuditLogDetail,
//   ) {}

//   async produceLog(
//     tableName: string,
//     recordId: number,
//     changes: any[],
//     operation: string,
//     userId: number,
//   ) {
//     await this.producer.connect();
//     console.log(`Producing log for ${tableName} with recordId ${recordId}`);
//     await this.producer.send({
//       topic: 'auditing-log',
//       messages: [
//         {
//           value: JSON.stringify({
//             tableName,
//             recordId,
//             changes,
//             operation,
//             userId,
//             timestamp: new Date().toISOString(),
//           }),
//         },
//       ],
//     });
//     console.log('Log produced successfully');
//   }
  
//   // async consumeLogs() {
//   //   await this.consumer.connect();
//   //   await this.consumer.subscribe({ topic: 'auditing-log', fromBeginning: true });
  
//   //   await this.consumer.run({
//   //     eachMessage: async ({ topic, partition, message }) => {
//   //       const log = JSON.parse(message.value.toString());
//   //       console.log(`Consuming log for ${log.tableName} with recordId ${log.recordId}`);
//   //       const header = await this.auditLogHeaderModel.create({
//   //         id: log.recordId,
//   //         tableName: log.tableName,
//   //         recordId: log.recordId,
//   //         operation: log.operation,
//   //         performedBy: log.userId,
//   //         performedAt: log.timestamp,
//   //       });
//   //       console.log('Header created successfully');
//   //       for (const change of log.changes) {
//   //         await this.auditLogDetailsModel.create({
//   //           auditLogHeaderId: header.id,
//   //           fieldName: change.fieldName,
//   //           oldValue: change.oldValue,
//   //           newValue: change.newValue,
//   //         });
//   //         console.log(`Detail log created for field ${change.fieldName}`);
//   //       }
//   //     },
//   //   });
//   //   console.log('Consumer running');
//   // }

//   async consumeLogs() {
    
//     await this.consumer.connect();
//     console.log('before cosumer subscription.');
    
//     await this.consumer.subscribe({ topic: 'auditing-log', fromBeginning: true });
//     console.log('before cosnumer run');
    
//     await this.consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const log = JSON.parse(message.value.toString());
//         console.log(`Consuming log for ${log.tableName} with recordId ${log.recordId}`);
//         const header = await this.auditLogHeaderModel.create({
//           id: log.recordId,
//           tableName: log.tableName,
//           recordId: log.recordId,
//           operation: log.operation,
//           performedBy: log.userId,
//           performedAt: log.timestamp,
//         });
//         console.log('Header created successfully');
//         for (const change of log.changes) {
//           await this.auditLogDetailsModel.create({
//             auditLogHeaderId: header.id,
//             fieldName: change.fieldName,
//             oldValue: change.oldValue,
//             newValue: change.newValue,
//           });
//           console.log(`Detail log created for field ${change.fieldName}`);
//         }
//       },
//     });
//     console.log('Consumer running');
//   }
  
  
// }
