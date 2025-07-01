import {
  Controller,
  Get,
  Body,
  Param,
  Headers,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { IAuthRequest } from 'src/interfaces/IAuthRequest.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async findMe(@Req() request: IAuthRequest) {
    if (!request.user) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: request.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        followers: true,
        followings: true,
        posts: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found in DB');
    }

    return user;
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
