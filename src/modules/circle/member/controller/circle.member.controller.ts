import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import {
  CIRCLE_MEMBER_APPLY_INBOUND_PORT,
  CircleMemberApplyInboundPort,
  CircleMemberApplyInboundPortInputDto,
} from '../inbound-port/circle.member.apply.inbound-port';
import { Request } from 'express';
import {
  CIRCLE_MEMBER_READ_APPLICATIONS_INBOUND_PORT,
  CircleMemberReadApplicationsInboundPort,
  CircleMemberReadApplicationsInboundPortInputDto,
} from '../inbound-port/circle.member.read-applications.inbound-port';
import {
  CIRCLE_MEMBER_APPROVE_INBOUND_PORT,
  CircleMemberApproveInboundPort,
  CircleMemberApproveInboundPortInputDto,
} from '../inbound-port/circle.member.approve.inbound-port';
import {
  CIRCLE_MEMBER_READ_INBOUND_PORT,
  CircleMemberReadInboundPort,
  CircleMemberReadInboundPortInputDto,
} from '../inbound-port/circle.member.read.inbound-port';

@UseGuards(AuthJwtGuard)
@Controller('circle/member')
export class CircleMemberController {
  constructor(
    @Inject(CIRCLE_MEMBER_APPLY_INBOUND_PORT)
    private readonly circleMemberApplyInboundPort: CircleMemberApplyInboundPort,
    @Inject(CIRCLE_MEMBER_READ_APPLICATIONS_INBOUND_PORT)
    private readonly circleMemberReadApplicationsInboundPort: CircleMemberReadApplicationsInboundPort,
    @Inject(CIRCLE_MEMBER_APPROVE_INBOUND_PORT)
    private readonly circleMemberApproveInboundPort: CircleMemberApproveInboundPort,
    @Inject(CIRCLE_MEMBER_READ_INBOUND_PORT)
    private readonly circleMemberReadInboundPort: CircleMemberReadInboundPort,
  ) {}

  @Post('apply')
  async apply(
    @Req()
    req: Request,
    @Body()
    body: any,
  ) {
    const params: CircleMemberApplyInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.circleMemberApplyInboundPort.execute(params);
  }

  @Post('approve')
  async approve(
    @Req()
    req: Request,
    @Body()
    body: any,
  ) {
    const params: CircleMemberApproveInboundPortInputDto = {
      userId: req.user as string,
      ...body,
    };
    return await this.circleMemberApproveInboundPort.execute(params);
  }

  @Get('readApplications')
  async readApplications(
    @Req()
    req: Request,
    @Query('circleId')
    query,
  ) {
    const params: CircleMemberReadApplicationsInboundPortInputDto = {
      userId: req.user as string,
      circleId: query,
    };
    return await this.circleMemberReadApplicationsInboundPort.execute(params);
  }

  @Get('read')
  async read(
    @Req()
    req: Request,
    @Query('circleId')
    query,
  ) {
    const params: CircleMemberReadInboundPortInputDto = {
      userId: req.user as string,
      circleId: query,
    };
    return await this.circleMemberReadInboundPort.execute(params);
  }
}
