import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { CandidateController } from './app.controller';
import { CandidateService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { create } from 'domain';
import { Certificate } from 'crypto';
import { Certifications } from './modules/entities/certifications.entity';
import { Candidates } from './modules/entities/candidates.entity';
import { Interviews } from './modules/entities/interviews.entity';
import { CertificationsController } from './certifications.controller';
import { InterviewController } from './interview.controller';
import { InterviewsService } from './interview.service';
import { CertificationsService } from './certifications.service';
import { ZoomController } from './zoom.controller';
import { ZoomService } from './zoom.integration.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CANDIDATE_SCREENING_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3004,
        },
      },
    ]),

    HttpModule.register({}),
    TypeOrmModule.forFeature([Candidates,Interviews,Certifications]),
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
        entities: [join(__dirname, 'apps/candidate-screening-ms/src/**/*.entity.{js,ts}')],
        synchronize: true,//configService.get<string>('NODE_ENV') === 'development',//
        autoLoadEntities: true, // Auto-load entities
        logging: configService.get<string>('NODE_ENV') === 'development', // Enable logging in dev
      }),
    }),
  ],
  controllers: [CandidateController,CertificationsController,InterviewController,ZoomController],
  providers: [CandidateService,CertificationsService,InterviewsService,ZoomService],
})
export class AppModule {}
