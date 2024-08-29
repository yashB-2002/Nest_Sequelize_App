// src/audit-log/audit-log-consumer.service.ts
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AuditLogHeader } from './entities/AuditlogHeader';
import { AuditLogDetail } from './entities/AuditLogDetail';
// import { MessagingAdapter } from './message.adapter';
import { KafkaAdapter } from './kafka/kafka.adapter';
import { MessagingAdapter } from './message.adapter';
@Injectable()
export class AuditLogConsumerService {
  constructor(
    @Inject('MessagingAdapter') private readonly messagingAdapter: MessagingAdapter,
  ) {}

  // async onModuleInit() {
  //   await this.messagingAdapter.consumeLogs();
  // }
}
