import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FibonacciService } from './fibonacci.service';
import { CacheManagerMock } from './mocks';

describe('FibonacciService', () => {
  let fibonacciService: FibonacciService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FibonacciService,
        {
          provide: 'CACHE_MANAGER',
          useClass: CacheManagerMock,
        },
      ],
    }).compile();

    fibonacciService = app.get<FibonacciService>(FibonacciService);
  });

  describe('get', () => {
    it('should return the correct fibonacci number', async () => {
      expect(await fibonacciService.get('5')).toEqual(5);
    });

    it('should throw a bad request exception', async () => {
      try {
        await fibonacciService.get('asdasd');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
