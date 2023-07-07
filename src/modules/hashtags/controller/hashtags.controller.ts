import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import { Request } from 'express';
import {
  HASHTAG_CREATE_USERS_HASHTAGS_INBOUND_PORT,
  HashtagCreateUsersHashtagsInboundPort,
  HashtagCreateUsersHashtagsInboundPortInputDto,
} from '../inbound-port/hashtag.users-hashtags-create.inbound-port';
import {
  HASHTAG_DELETE_USERS_HASHTAGS_INBOUND_PORT,
  HashtagDeleteUsersHashtagsInboundPort,
  HashtagDeleteUsersHashtagsInboundPortInputDto,
} from '../inbound-port/hashtag.users-hashtags-delete.inbound-port';
import {
  HASHTAG_READ_USERS_HASHTAGS_INBOUND_PORT,
  HashtagReadUsersHashtagsInboundPort,
  HashtagReadUsersHashtagsInboundPortInputDto,
} from '../inbound-port/hashtag.users-hashtags-read.inbound-port';

@UseGuards(AuthJwtGuard)
@Controller('hashtag')
export class HashtagsController {
  constructor(
    @Inject(HASHTAG_CREATE_USERS_HASHTAGS_INBOUND_PORT)
    private readonly hashtagCreateUsersHashtagsInboundPort: HashtagCreateUsersHashtagsInboundPort,
    @Inject(HASHTAG_DELETE_USERS_HASHTAGS_INBOUND_PORT)
    private readonly hashtagDeleteUsersHashtagsInboundPort: HashtagDeleteUsersHashtagsInboundPort,
    @Inject(HASHTAG_READ_USERS_HASHTAGS_INBOUND_PORT)
    private readonly hashtagReadUsersHashtagsInboundPort: HashtagReadUsersHashtagsInboundPort,
  ) {}

  @Post('userCreate')
  async create(@Req() req: Request, @Body() body: any) {
    const params: HashtagCreateUsersHashtagsInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return this.hashtagCreateUsersHashtagsInboundPort.execute(params);
  }

  @Get('userRead')
  async read(@Req() req: Request) {
    const params: HashtagReadUsersHashtagsInboundPortInputDto = {
      userId: req.user as string,
    };
    return this.hashtagReadUsersHashtagsInboundPort.execute(params);
  }

  @Delete('userDelete')
  async delete(@Req() req: Request, @Body() body: any) {
    const params: HashtagDeleteUsersHashtagsInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.hashtagDeleteUsersHashtagsInboundPort.execute(params);
  }
}
