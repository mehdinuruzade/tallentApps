import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from './modules/filters/rpc-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
  .setTitle('My Startup API')  
  .setDescription('The startup API description')  
  .setVersion('1.0')  
  .addTag('auth')  
  .build();

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen(3000);
}
bootstrap();
