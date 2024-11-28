import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './modules/strategies/local.strategy';
import { JwtStrategy } from './modules/strategies/jwt.strategy';
import { RefreshJwtStrategy } from './modules/strategies/refreshToken.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshToken } from './modules/entities/refreshtoken.entity';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '120s' },
      }),
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
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
        entities: [join(__dirname, '**/*.entity.{js,ts}')],
        synchronize: false, //configService.get<string>('NODE_ENV') === 'development'//
        autoLoadEntities: true, // Auto-load entities
        logging: configService.get<string>('NODE_ENV') === 'development', // Enable logging in dev
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
})
export class AppModule {}
