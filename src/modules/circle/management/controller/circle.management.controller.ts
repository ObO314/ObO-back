import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import { RoutineCreateRecordInboundPortInputDto } from 'src/modules/routine/inbound-port/routine.create-record.inbound-port';
import { RoutineDeleteInboundPortInputDto } from 'src/modules/routine/inbound-port/routine.delete.inbound-port';
import {
  CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT,
  CircleManagementCreateInboundPort,
  CircleManagementCreateInboundPortInputDto,
} from '../inbound-port/circle.management.create.inbound-port';
import {
  CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT,
  CircleManagementDeleteInboundPort,
  CircleManagementDeleteInboundPortInputDto,
} from '../inbound-port/circle.management.delete.inbound-port';
import { Request } from 'express';

@UseGuards(AuthJwtGuard)
@Controller('circle/management')
export class CircleManagementController {
  constructor(
    @Inject(CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT)
    private readonly circleManagementCreateInboundPort: CircleManagementCreateInboundPort,
    @Inject(CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT)
    private readonly circleManagementDeleteInboundPort: CircleManagementDeleteInboundPort,
  ) {}

  @Post('create')
  async createRecord(@Req() req: Request, @Body() body: any) {
    const params: CircleManagementCreateInboundPortInputDto = {
      owner: req.user,
      ...body,
    };
    return await this.circleManagementCreateInboundPort.execute(params);
  }

  @Delete('delete')
  async delete(@Req() req: Request, @Body() body: any) {
    const params: CircleManagementDeleteInboundPortInputDto = {
      userId: req.user,
      ...body,
    };
    return await this.circleManagementDeleteInboundPort.execute(params);
  }
}
