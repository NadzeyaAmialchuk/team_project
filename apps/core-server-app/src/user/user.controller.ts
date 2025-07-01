import {
  Controller,
  Get,
  Body,
  Param,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { IAuthRequest } from 'src/interfaces/IAuthRequest.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@Req() request: IAuthRequest) {
    console.log(request.user);
    if (request.user) {
      return {
        userId: request.user.id,
        email: request.user.email,
      };
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
}
