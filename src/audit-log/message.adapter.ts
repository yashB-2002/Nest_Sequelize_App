import { Injectable } from '@nestjs/common';

export interface IMessagingAdapter {
  produceLog(
    tableName: string,
    recordId: number,
    changes: any[],
    operation: string,
    userId: number,
  ): Promise<void>;

  consumeLogs(): Promise<void>;
}

@Injectable()
export abstract class MessagingAdapter implements IMessagingAdapter {
  abstract produceLog(
    tableName: string,
    recordId: number,
    changes: any[],
    operation: string,
    userId: number,
  ): Promise<void>;

  abstract consumeLogs(): Promise<void>;
}
