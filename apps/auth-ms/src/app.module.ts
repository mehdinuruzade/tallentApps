import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

const envFilePath = join(
  process.cwd(),
  `.env.${process.env.NODE_ENV || 'development'}`, // Read from root
);

if (!fs.existsSync(envFilePath)) {
  console.error(`Environment file not found: ${envFilePath}`);
  process.exit(1);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        `.env.${process.env.NODE_ENV || 'development'}`, // Read from root
      ), // Dynamically load based on NODE_ENV
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SCHEMA: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: configService.get('DB_SCHEMA'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: configService.get<string>('NODE_ENV') === 'development', // Only true in dev
        autoLoadEntities: true, // Auto-load entities
        logging: configService.get<string>('NODE_ENV') === 'development', // Enable logging in dev
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
