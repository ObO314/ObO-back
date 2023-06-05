import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/guard/auth.jwt.guard';
import {
  ROUTINE_CREATE_INBOUND_PORT,
  RoutineCreateInboundPort,
  RoutineCreateInboundPortInputDto,
} from '../inbound-port/routine.create.inbound-port';
import { Request } from 'express';

@UseGuards(AuthJwtGuard)
@Controller('routine')
export class TodoController {
  constructor(
    @Inject(ROUTINE_CREATE_INBOUND_PORT)
    private readonly routineCreateInboundPort: RoutineCreateInboundPort,
  ) {}

  @Post('create')
  async create(@Req() req: Request, @Body() body: any) {
    const params: RoutineCreateInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return this.routineCreateInboundPort.create(params);
  }
}
