import { Controller } from '@nestjs/common';
import { UserStore } from './user.store';

@Controller('store')
export class StoreController {

    constructor(private userStore:UserStore){}

}
