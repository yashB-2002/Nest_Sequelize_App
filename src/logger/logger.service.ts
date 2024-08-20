import { Injectable } from '@nestjs/common';
 
@Injectable()
export class LoggerService {
  private loggingEnv: string;
 
  constructor(loggingEnv: string = 'running') {
    this.loggingEnv = loggingEnv;
  }
 
  log(message: string) {
    if (this.loggingEnv === 'debug') {
      console.log(`[DEBUG]: ${message}`);
    }
    else if (this.loggingEnv === 'running') {
        console.log(`[RUNNING]: ${message}`);
    }
    else{
        console.log(`[DEVELOPMENT]: ${message}`);
    }
  }
}