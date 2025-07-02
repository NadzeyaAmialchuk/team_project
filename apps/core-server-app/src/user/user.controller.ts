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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user self data' })
  @ApiResponse({ status: 200, description: 'Success' })
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
  @ApiOperation({ summary: 'Get info about all users' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get info about one user' })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
}
