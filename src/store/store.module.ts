import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { UserStore } from './user.store';
import { Store } from './store';

@Module({
  providers:[UserStore,{
    provide:Store,
    useClass:UserStore
  }],
  controllers: [StoreController]
})
export class StoreModule {}
