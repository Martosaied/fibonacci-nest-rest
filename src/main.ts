import { NestFactory } from '@nestjs/core';
import { FibonacciModule } from './fibonacci.module';

async function bootstrap() {
  const app = await NestFactory.create(FibonacciModule);
  await app.listen(3000);
}
bootstrap();
