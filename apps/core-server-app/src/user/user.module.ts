import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    PrismaModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: configService.get('AUTH_SERVICE_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
})
export class UserModule {}
