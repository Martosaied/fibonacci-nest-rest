import { Injectable } from '@nestjs/common';

@Injectable()
export class FibonacciServiceMock {
  async get(): Promise<number> {
    return 5;
  }
}

export class CacheManagerMock {
  private cache = {};

  set = jest.fn((key, value): void => {
    this.cache[key] = value;
  });

  get = jest.fn(async (key): Promise<any> => this.cache[key] || null);
}
