import {
  ROUTINE_DELETE_RECORD_INBOUND_PORT,
  RoutineDeleteRecordInboundPort,
  RoutineDeleteRecordInboundPortInputDto,
} from './../inbound-port/routine.delete-record.inbound-port';
import {
  RoutineReadByDateInboundPort,
  RoutineReadByDateInboundPortInputDto,
} from './../inbound-port/routine.read-by-date.inbound-port';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import {
  ROUTINE_CREATE_INBOUND_PORT,
  RoutineCreateInboundPort,
  RoutineCreateInboundPortInputDto,
} from '../inbound-port/routine.create.inbound-port';
import { ROUTINE_READ_BY_DATE_INBOUND_PORT } from '../inbound-port/routine.read-by-date.inbound-port';
import {
  ROUTINE_UPDATE_INBOUND_PORT,
  RoutineUpdateInboundPort,
  RoutineUpdateInboundPortInputDto,
} from '../inbound-port/routine.update.inbound-port';
import {
  ROUTINE_CREATE_RECORD_INBOUND_PORT,
  RoutineCreateRecordInboundPort,
  RoutineCreateRecordInboundPortInputDto,
} from '../inbound-port/routine.create-record.inbound-port';
import {
  ROUTINE_DELETE_INBOUND_PORT,
  RoutineDeleteInboundPort,
  RoutineDeleteInboundPortInputDto,
} from '../inbound-port/routine.delete.inbound-port';
import { Request } from 'express';

@UseGuards(AuthJwtGuard)
@Controller('routine')
export class RoutineController {
  constructor(
    @Inject(ROUTINE_CREATE_RECORD_INBOUND_PORT)
    private readonly routineCreateRecordInboundPort: RoutineCreateRecordInboundPort,
    @Inject(ROUTINE_CREATE_INBOUND_PORT)
    private readonly routineCreateInboundPort: RoutineCreateInboundPort,
    @Inject(ROUTINE_DELETE_RECORD_INBOUND_PORT)
    private readonly routineDeleteRecordInboundPort: RoutineDeleteRecordInboundPort,
    @Inject(ROUTINE_DELETE_INBOUND_PORT)
    private readonly routineDeleteInboundPort: RoutineDeleteInboundPort,
    @Inject(ROUTINE_READ_BY_DATE_INBOUND_PORT)
    private readonly routineReadByDateInboundPort: RoutineReadByDateInboundPort,
    @Inject(ROUTINE_UPDATE_INBOUND_PORT)
    private readonly routineUpdateByIdInboundPort: RoutineUpdateInboundPort,
  ) {}

  @Post('createRecord')
  async createRecord(@Req() req: Request, @Body() body: any) {
    const params: RoutineCreateRecordInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return await this.routineCreateRecordInboundPort.execute(params);
  }

  @Post('create')
  async create(@Req() req: Request, @Body() body: any) {
    const params: RoutineCreateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.routineCreateInboundPort.execute(params);
  }

  @Delete('deleteRecord')
  async deleteRecord(@Req() req: Request, @Body() body: any) {
    const params: RoutineDeleteRecordInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return await this.routineDeleteRecordInboundPort.execute(params);
  }

  @Delete('delete')
  async delete(@Req() req: Request, @Body() body: any) {
    const params: RoutineDeleteInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return await this.routineDeleteInboundPort.execute(params);
  }

  @Get('readByDate')
  async readByDate(@Req() req: Request, @Body() body: any) {
    const params: RoutineReadByDateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return await this.routineReadByDateInboundPort.execute(params);
  }

  @Patch('update')
  async update(@Req() req: Request, @Body() body: any) {
    const params: RoutineUpdateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.routineUpdateByIdInboundPort.execute(params);
  }
}
