import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { IAuthRequest } from 'interfaces/IAuthRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IAuthRequest>();
    const accessToken = request.cookies.access_token;

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://localhost:3001/auth/check',
          {},
          {
            headers: { Cookie: `access_token=${accessToken}` },
          },
        ),
      );

      if (!response.data.valid) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = { id: response.data.userId };
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Authorization failed');
    }
  }
}
