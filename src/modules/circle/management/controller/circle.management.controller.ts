import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import {
  CIRCLE_MANAGEMENT_READ_BY_NAME_INBOUND_PORT,
  CircleManagementReadByNameInboundPort,
  CircleManagementReadByNameInboundPortInputDto,
  CircleManagementReadByNameInboundPortOutputDto,
} from '../inbound-port/circle.management.read-by-name.inbound-port';
import {
  CIRCLE_MANAGEMENT_READ_INBOUND_PORT,
  CircleManagementReadInboundPort,
  CircleManagementReadInboundPortInputDto,
} from '../inbound-port/circle.management.read.inbound-port';
import {
  CIRCLE_MANAGEMENT_UPDATE_INBOUND_PORT,
  CircleManagementUpdateInboundPort,
  CircleManagementUpdateInboundPortInputDto,
} from '../inbound-port/circle.management.update.inbound-port';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { S3Client } from '@aws-sdk/client-s3';

@UseGuards(AuthJwtGuard)
@Controller('circle/management')
export class CircleManagementController {
  constructor(
    @Inject(CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT)
    private readonly circleManagementCreateInboundPort: CircleManagementCreateInboundPort,
    @Inject(CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT)
    private readonly circleManagementDeleteInboundPort: CircleManagementDeleteInboundPort,
    @Inject(CIRCLE_MANAGEMENT_READ_BY_NAME_INBOUND_PORT)
    private readonly circleManagementReadByNameInboundPort: CircleManagementReadByNameInboundPort,
    @Inject(CIRCLE_MANAGEMENT_READ_INBOUND_PORT)
    private readonly circleManagementReadInboundPort: CircleManagementReadInboundPort,
    @Inject(CIRCLE_MANAGEMENT_UPDATE_INBOUND_PORT)
    private readonly circleManagementUpdateInboundPort: CircleManagementUpdateInboundPort,
  ) {}

  @Get('readByName')
  async readByName(
    @Query('circleName')
    query,
  ) {
    const params: CircleManagementReadByNameInboundPortInputDto = {
      name: query,
    };
    return await this.circleManagementReadByNameInboundPort.execute(params);
  }

  @Get('read')
  async read(
    @Query('circleId')
    query,
  ) {
    const params: CircleManagementReadInboundPortInputDto = {
      circleId: query,
    };
    return await this.circleManagementReadInboundPort.execute(params);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        s3: new S3Client({
          region: process.env.AWS_BUCKET_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }),
        bucket: 'obo-s3',
        key(_req, file, done) {
          const ext = path.extname(file.originalname); //확장자
          const basename = path.basename(file.originalname, ext); //파일명
          done(null, `obo-circle-profile/${Date.now()}_${basename}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @Post('update')
  async update(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const params: CircleManagementUpdateInboundPortInputDto = {
      ...body,
      userId: req.user,
      profileImg: image ? image.location : null,
      isOpen: body.isOpen ? Boolean(body.isOpen) : true,
    };
    return await this.circleManagementUpdateInboundPort.execute(params);
  }

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
