import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { FibonacciService } from './fibonacci.service';

@Controller('fibonacci')
@UseInterceptors(CacheInterceptor)
export class FibonacciController {
  constructor(private readonly fibonacciService: FibonacciService) {}

  @Get(':index')
  async get(@Param('index') index: string): Promise<number> {
    return this.fibonacciService.get(index);
  }
}
