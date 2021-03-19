import { FibonacciController } from './fibonacci.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { FibonacciService } from './fibonacci.service';
import { CacheManagerMock, FibonacciServiceMock } from './mocks';

describe('FibonacciController', () => {
  let fibonacciController: FibonacciController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FibonacciController],
      providers: [
        FibonacciService,
        {
          provide: 'CACHE_MANAGER',
          useClass: CacheManagerMock,
        },
      ],
    })
      .overrideProvider(FibonacciService)
      .useClass(FibonacciServiceMock)
      .compile();

    fibonacciController = app.get<FibonacciController>(FibonacciController);
  });

  describe('/fibonacci/:index (GET)', () => {
    it('should return the correct value', async () => {
      expect(await fibonacciController.get('5')).toEqual(5);
    });
  });
});
