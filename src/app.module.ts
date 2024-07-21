import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { DATABASE_CONFIG } from './config/database';
import { JWT_CONFIG } from './config/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./env/.env'],
      load: [DATABASE_CONFIG, JWT_CONFIG],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('DATABASE_CONFIG');
        if(!databaseConfig) throw new Error('Database configuration is missing or invalid');
        const { host, port, username, password, database } = databaseConfig;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [],
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
