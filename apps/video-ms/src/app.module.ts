import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { VideoController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { create } from 'domain';
import { Application } from './modules/entities/applications.entity';
import { VideoService } from './app.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3005,
        },
      },
    ]),

   
    TypeOrmModule.forFeature([Application]),
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
        entities: [join(__dirname, 'apps/vacancy-management-ms/src/**/*.entity.{js,ts}')],
        synchronize: true,//configService.get<string>('NODE_ENV') === 'development',//
        autoLoadEntities: true, // Auto-load entities
        logging: configService.get<string>('NODE_ENV') === 'development', // Enable logging in dev
      }),
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class AppModule {}
