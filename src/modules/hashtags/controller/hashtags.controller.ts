import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import {
  HASHTAGS_USER_CREATE_INBOUND_PORT,
  HashtagsUserCreateInboundPort,
  HashtagsUserCreateInboundPortInputDto,
} from '../inbound-port/hashtags.user-create.inbound-port';
import {
  HASHTAGS_USER_READ_INBOUND_PORT,
  HashtagsUserReadInboundPort,
} from '../inbound-port/hashtags.user-read.inbound-port';
import {
  HASHTAGS_USER_DELETE_INBOUND_PORT,
  HashtagsUserDeleteInboundPort,
} from '../inbound-port/hashtags.user-delete.inbound-port';
import { Request } from 'express';

@UseGuards(AuthJwtGuard)
@Controller('hashtag')
export class HashtagsController {
  constructor(
    @Inject(HASHTAGS_USER_CREATE_INBOUND_PORT)
    private readonly hashtagsUserCreateInboundport: HashtagsUserCreateInboundPort,
    @Inject(HASHTAGS_USER_READ_INBOUND_PORT)
    private readonly hashtagsUserReadInboundPort: HashtagsUserReadInboundPort,
    @Inject(HASHTAGS_USER_DELETE_INBOUND_PORT)
    private readonly hashtagsUserDeleteInboundPort: HashtagsUserDeleteInboundPort,
  ) {}

  @Post('userCreate')
  async create(@Req() req: Request, @Body() body: any) {
    const params: HashtagsUserCreateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.hashtagsUserCreateInboundport.create(params);
  }

  @Get('userRead')
  async read(@Req() req: Request, @Body() body: any) {
    const params = {
      userId: req.user,
      ...body,
    };
    return this.hashtagsUserReadInboundPort.read(params);
  }

  @Delete('userDelete')
  async delete(@Req() req: Request, @Body() body: any) {
    const params = {
      userId: req.user,
      ...body,
    };
    return this.hashtagsUserDeleteInboundPort.delete(params);
  }
}
