import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class FibonacciService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  get(index: string): Promise<number> {
    const parsedIndex = parseInt(index);
    if (!Number.isInteger(parsedIndex)) {
      throw new BadRequestException('The parameter must be an integer.');
    }
    if (parsedIndex < 0) {
      throw new BadRequestException('The parameter must be greater than 0.');
    }

    return this.fibonacci(parsedIndex);
  }

  async fibonacci(index: number): Promise<number> {
    const cachedResult: number = await this.cacheManager.get(index.toString());
    if (cachedResult) return cachedResult;

    if (index === 1) return 1;
    if (index <= 0) return 0;

    const result =
      (await this.fibonacci(index - 1)) + (await this.fibonacci(index - 2));
    await this.cacheManager.set(index.toString(), result, { ttl: null });
    return result;
  }
}
