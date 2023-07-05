import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import {
  WORK_CREATE_INBOUND_PORT,
  WorkCreateInboundPort,
  WorkCreateInboundPortInputDto,
} from '../inbound-port/work.create.inbound-port';
import {
  WORK_DELETE_INBOUND_PORT,
  WorkDeleteInboundPort,
  WorkDeleteInboundPortInputDto,
} from '../inbound-port/work.delete.inbound-port';
import {
  WORK_READ_INBOUND_PORT,
  WorkReadInboundPort,
  WorkReadInboundPortInputDto,
} from '../inbound-port/work.read.inbound-port';
import {
  WORK_UPDATE_INBOUND_PORT,
  WorkUpdateInboundPort,
  WorkUpdateInboundPortInputDto,
} from '../inbound-port/work.update.inbound-port';
import { Request } from 'express';
import { group } from 'console';

@UseGuards(AuthJwtGuard)
@Controller('work')
export class WorkController {
  constructor(
    @Inject(WORK_CREATE_INBOUND_PORT)
    private readonly workCreateInboundPort: WorkCreateInboundPort,
    @Inject(WORK_DELETE_INBOUND_PORT)
    private readonly workDeleteInboundPort: WorkDeleteInboundPort,
    @Inject(WORK_READ_INBOUND_PORT)
    private readonly workReadInboundPort: WorkReadInboundPort,
    @Inject(WORK_UPDATE_INBOUND_PORT)
    private readonly workUpdateInboundPort: WorkUpdateInboundPort,
  ) {}

  @Post('create')
  async create(
    @Req()
    req: Request,
    @Body()
    body: any,
  ) {
    const params: WorkCreateInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.workCreateInboundPort.execute(params);
  }

  @Get('read')
  async read(
    @Req()
    req: Request,
    @Query() query: any,
  ) {
    const params: WorkReadInboundPortInputDto = {
      userId: req.user as string,
      ...query,
    };
    return await this.workReadInboundPort.execute(params);
  }

  @Patch('update')
  async update(
    @Req() req: Request,
    @Body()
    body: any,
  ) {
    const params: WorkUpdateInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.workUpdateInboundPort.execute(params);
  }

  @Delete('delete')
  async delete(
    @Req()
    req: Request,
    @Body()
    body: any,
  ) {
    const params: WorkDeleteInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.workDeleteInboundPort.execute(params);
  }
}
