import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MessagingAdapter } from "./message.adapter";
import { KafkaAdapter } from "./kafka/kafka.adapter";
import { AuditLogDetail } from "./entities/AuditLogDetail";
import { AuditLogHeader } from "./entities/AuditlogHeader";

@Injectable()
export class MessagingAdapterFactory {
  constructor(private configService: ConfigService) {}

  createAdapter(): MessagingAdapter {
    const messagingType = this.configService.get<string>('MESSAGING_SYSTEM');

    switch (messagingType) {
      case 'KAFKA':
        return new KafkaAdapter(AuditLogHeader,AuditLogDetail); 
      default:
        throw new Error(`Unsupported messaging system: ${messagingType}`);
    }
  }
}