import {
  README_DELETE_INBOUND_PORT,
  ReadmeDeleteInboundPort,
} from './../inbound-port/readme.delete.inbound-port';
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
import {
  README_UPDATE_INBOUND_PORT,
  ReadmeUpdateInboundPort,
  ReadmeUpdateInboundPortInputDto,
} from '../inbound-port/readme.update.inbound-port';
import {
  README_READ_INBOUND_PORT,
  ReadmeReadInboundPort,
  ReadmeReadInboundPortInputDto,
} from './../inbound-port/readme.read.inbound-port';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import { Request } from 'express';
import { ReadmeDeleteInboundPortInputDto } from '../inbound-port/readme.delete.inbound-port';

@UseGuards(AuthJwtGuard)
@Controller('readme')
export class ReadmeController {
  constructor(
    @Inject(README_READ_INBOUND_PORT)
    private readonly readmeReadInboundPort: ReadmeReadInboundPort,
    @Inject(README_UPDATE_INBOUND_PORT)
    private readonly readmeUpdateInboundPort: ReadmeUpdateInboundPort,
    @Inject(README_DELETE_INBOUND_PORT)
    private readonly readmeDeleteInboundPort: ReadmeDeleteInboundPort,
  ) {}

  @Get('read')
  async read(@Req() req: Request) {
    const params: ReadmeReadInboundPortInputDto = {
      userId: req.user as string,
    };
    return this.readmeReadInboundPort.read(params);
  }

  @Post('update')
  async update(@Req() req: Request, @Body() body: any) {
    const params: ReadmeUpdateInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return this.readmeUpdateInboundPort.update(params);
  }

  @Delete('delete')
  async delete(@Req() req: Request, @Body() body: any) {
    const params: ReadmeDeleteInboundPortInputDto = {
      userId: req.user as string,
    };
    return this.readmeDeleteInboundPort.delete(params);
  }
}
