import {
  RoutineReadByDateInboundPort,
  RoutineReadByDateInboundPortInputDto,
} from './../inbound-port/routine.read-by-date.inbound-port';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/guard/auth.jwt.guard';
import {
  ROUTINE_CREATE_INBOUND_PORT,
  RoutineCreateInboundPort,
  RoutineCreateInboundPortInputDto,
} from '../inbound-port/routine.create.inbound-port';
import { Request } from 'express';
import { ROUTINE_READ_BY_DATE_INBOUND_PORT } from '../inbound-port/routine.read-by-date.inbound-port';

@UseGuards(AuthJwtGuard)
@Controller('routine')
export class RoutineController {
  constructor(
    @Inject(ROUTINE_CREATE_INBOUND_PORT)
    private readonly routineCreateInboundPort: RoutineCreateInboundPort,
    @Inject(ROUTINE_READ_BY_DATE_INBOUND_PORT)
    private readonly routineReadByDateInboundPort: RoutineReadByDateInboundPort,
  ) {}

  @Post('create')
  async create(@Req() req: Request, @Body() body: any) {
    const params: RoutineCreateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.routineCreateInboundPort.create(params);
  }

  @Get('readByDate')
  async readByDate(@Req() req: Request, @Body() body: any) {
    const params: RoutineReadByDateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.routineReadByDateInboundPort.readByDate(params);
  }
}
