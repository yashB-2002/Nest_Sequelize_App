import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
 
@Module({})
export class LoggerModule {
  static register(loggingEnv: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useValue: new LoggerService(loggingEnv),
        },
      ],
      exports: [LoggerService],
    };
  }
}