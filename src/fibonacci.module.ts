import { CacheModule, Module } from '@nestjs/common';
import { FibonacciController } from './fibonacci.controller';
import { FibonacciService } from './fibonacci.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [FibonacciController],
  providers: [FibonacciService],
})
export class FibonacciModule {}
