
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );

  // Apply ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error for undefined properties
      transform: true, // Automatically transform payloads to DTO instances
      exceptionFactory: (errors) => {
        console.error(errors); // Log detailed errors
        return new BadRequestException(errors);
      },
    }),
  );

  await app.listen();
  logger.log('Auth Microservice is listening on port 3001...');
}
bootstrap();
