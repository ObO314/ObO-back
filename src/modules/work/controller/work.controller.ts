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
  WORK_READ_BY_DATE_INBOUND_PORT,
  WorkReadByDateInboundPort,
  WorkReadByDateInboundPortInputDto,
} from '../inbound-port/work.read-by-date.inbound-port';
import {
  WORK_UPDATE_INBOUND_PORT,
  WorkUpdateInboundPort,
  WorkUpdateInboundPortInputDto,
} from '../inbound-port/work.update.inbound-port';
import { Request } from 'express';
import { group } from 'console';
import {
  WORK_CREATE_RECORD_INBOUND_PORT,
  WorkCreateRecordInboundPort,
  WorkCreateRecordInboundPortInputDto,
} from '../inbound-port/work.create-record.inbound-port';
import {
  WORK_DELETE_RECORD_INBOUND_PORT,
  WorkDeleteRecordInboundPort,
  WorkDeleteRecordInboundPortInputDto,
} from '../inbound-port/work.delete-record.inbound-port';
import {
  WORK_READ_INBOUND_PORT,
  WorkReadInboundPort,
  WorkReadInboundPortInputDto,
} from '../inbound-port/work.read.inbound-port';

@UseGuards(AuthJwtGuard)
@Controller('work')
export class WorkController {
  constructor(
    @Inject(WORK_CREATE_RECORD_INBOUND_PORT)
    private readonly workCreateRecordInboundPort: WorkCreateRecordInboundPort,
    @Inject(WORK_CREATE_INBOUND_PORT)
    private readonly workCreateInboundPort: WorkCreateInboundPort,
    @Inject(WORK_DELETE_INBOUND_PORT)
    private readonly workDeleteInboundPort: WorkDeleteInboundPort,
    @Inject(WORK_DELETE_RECORD_INBOUND_PORT)
    private readonly workDeleteRecordInboundPort: WorkDeleteRecordInboundPort,
    @Inject(WORK_READ_BY_DATE_INBOUND_PORT)
    private readonly workReadByDateInboundPort: WorkReadByDateInboundPort,
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
  @Post('createRecord')
  async createRecord(
    @Req()
    req: Request,
    @Body()
    body: any,
  ) {
    const params: WorkCreateRecordInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.workCreateRecordInboundPort.execute(params);
  }

  @Get('readByDate')
  async readByDate(
    @Req()
    req: Request,
    @Query() query: any,
  ) {
    const params: WorkReadByDateInboundPortInputDto = {
      userId: req.user as string,
      ...query,
    };
    return await this.workReadByDateInboundPort.execute(params);
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

  @Delete('deleteRecord')
  async deleteRecord(
    @Req()
    req: Request,
    @Body()
    body: any,
  ) {
    const params: WorkDeleteRecordInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.workDeleteRecordInboundPort.execute(params);
  }
}
