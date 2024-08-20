import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(private readonly cacheService: CacheService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const userId = request.headers['user-id']; 
        const key = `${userId || 'guest'}:${request.url}`;

        const cachedData = await this.cacheService.get(key);
        if (cachedData) {
            console.log('Fetching cached data for user:', userId);
            return of(cachedData); 
        }

        return next.handle().pipe(
            tap(async (data) => {
                await this.cacheService.set(key, data);
            }),
        );
    }
}
