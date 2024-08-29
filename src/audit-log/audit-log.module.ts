import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditLogHeader } from './entities/AuditlogHeader';
import { AuditLogDetail } from './entities/AuditLogDetail';
import { KafkaAdapter } from './kafka/kafka.adapter';
import { AuditService } from './audit-log.service';
import { MessagingAdapter } from './message.adapter';
import { AuditLogConsumerService } from './audit.consumer.service';
import { MessagingAdapterFactory } from './messging.adapter.factory';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [SequelizeModule.forFeature([AuditLogHeader, AuditLogDetail]), ConfigModule],
  providers: [
    MessagingAdapterFactory,
    {
      provide: 'MessagingAdapter',
      useFactory: (factory: MessagingAdapterFactory) => factory.createAdapter(),
      inject: [MessagingAdapterFactory],
    },
    AuditService,
    AuditLogConsumerService,
  ],
  exports: [AuditService],
})
export class AuditLogModule {
  constructor(private readonly auditConsumerService: AuditLogConsumerService) {}

  // async onModuleInit() {
  //   await this.auditConsumerService.onModuleInit();
  // }

  // async onModuleDestroy() {
  //   await this.auditConsumerService.onModuleDestroy();
  // }
}

// @Module({
//   imports: [SequelizeModule.forFeature([AuditLogHeader, AuditLogDetail]), ConfigModule],
//   providers: [
//     MessagingAdapterFactory,
//     {
//       provide: 'MessagingAdapter',
//       useFactory: (factory: MessagingAdapterFactory) => factory.createAdapter(),
//       inject: [MessagingAdapterFactory],
//     },
//     AuditService,
//     AuditLogConsumerService,
//   ],
//   exports: [AuditService],
// })

// @Module({
//   imports: [SequelizeModule.forFeature([AuditLogHeader, AuditLogDetail])],
//   providers: [KafkaAdapter,AuditService,MessagingAdapter,AuditLogConsumerService],
//   exports: [KafkaAdapter,AuditService],
// })

// export class AuditLogModule implements OnModuleInit {
//   constructor(private readonly auditConsumerService:AuditLogConsumerService){}
//   async onModuleInit() {
//     await this.auditConsumerService.onModuleInit();
//   }
// }
