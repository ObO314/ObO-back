import {
  USER_LOGOUT_INBOUND_PORT,
  userLogoutInboundPort,
  userLogoutInboundPortInputDto,
  userLogoutInboundPortOutputDto,
} from './../inbound-port/user.logout.inbound-port';
import { AuthJwtGuard } from 'src/modules/auth/guard/auth.jwt.guard';
import {
  USER_UPDATE_INBOUND_PORT,
  UserUpdateInboundPort,
} from './../inbound-port/user.update.inbound-port';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { each, map, pipe, tap } from '@fxts/core';
import {
  Controller,
  Inject,
  Body,
  Post,
  Res,
  UseGuards,
  Req,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
  Query,
} from '@nestjs/common';
import { Request, Response, query } from 'express';
import {
  USER_LOGIN_INBOUND_PORT,
  UserLoginInboundPort,
  UserLoginInboundPortInputDto,
  UserLoginInboundPortOutputDto,
} from '../inbound-port/user.login.inbound-port';
import {
  USER_SIGN_UP_INBOUND_PORT,
  UserSignUpInboundPort,
  UserSignUpInboundPortInputDto,
  UserSignUpInboundPortOutputDto,
} from '../inbound-port/user.sign-up.inbound-port';
import { DynamicAuthGuard } from 'src/modules/auth/guard/auth.dynamic.guard';
import {
  USER_READ_INBOUND_PORT,
  UserReadInboundPort,
  UserReadInboundPortInputDto,
} from '../inbound-port/user.read.inbound-port';
import { UserUpdateInboundPortInputDto } from '../inbound-port/user.update.inbound-port';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { LOCAL } from 'src/modules/auth/strategy/auth.local.strategy';

dotenv.config();

interface RequestGuardGiven extends Request {
  user: {
    userId: string;
    nickname: string;
    email: string;
    authMethod: string;
  };
}

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SIGN_UP_INBOUND_PORT)
    private readonly userSignUpLocalInboundPort: UserSignUpInboundPort,

    @Inject(USER_LOGIN_INBOUND_PORT)
    private readonly userLoginInboundPort: UserLoginInboundPort,

    @Inject(USER_READ_INBOUND_PORT)
    private readonly userReadInboundPort: UserReadInboundPort,

    @Inject(USER_UPDATE_INBOUND_PORT)
    private readonly userUpdateInboundPort: UserUpdateInboundPort,

    @Inject(USER_LOGOUT_INBOUND_PORT)
    private readonly userLogoutInboundPort: userLogoutInboundPort,
  ) {}

  //------------------------------------------------------------

  @Post('signUp/local')
  async signUpLocal(
    @Body()
    body: any,
  ): Promise<UserSignUpInboundPortOutputDto> {
    const params: UserSignUpInboundPortInputDto = {
      ...body,
      authMethod: LOCAL,
    };
    return this.userSignUpLocalInboundPort.execute(params);
  }

  //------------------------------------------------------------

  // 로컬로그인은 post
  @Post('login/local')
  @UseGuards(DynamicAuthGuard)
  async loginLocal(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<UserLoginInboundPortOutputDto> {
    const userLoginInboundPortInput = req.user as UserLoginInboundPortInputDto;
    return pipe(
      userLoginInboundPortInput,
      (input) => this.userLoginInboundPort.execute(input),
      tap((accessToken) =>
        res.setHeader('Authorization', 'Bearer ' + accessToken),
      ),
      tap((accessToken) => res.json(accessToken)),
    );
  }

  //------------------------------------------------------------

  //소셜로그인은 Get
  @UseGuards(DynamicAuthGuard)
  @Get('login/:method')
  async loginSocial(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<UserLoginInboundPortOutputDto> {
    const userLoginInboundPortInput = req.user as UserLoginInboundPortInputDto;
    return pipe(
      userLoginInboundPortInput,
      (input) => this.userLoginInboundPort.execute(input),
      tap((accessToken) =>
        res.setHeader('Authorization', 'Bearer ' + accessToken),
      ),
      tap((accessToken) => res.json(accessToken)),
    );
  }

  //------------------------------------------------------------

  @UseGuards(AuthJwtGuard)
  @Post('logout')
  async logout(
    @Req()
    req: Request,
  ): Promise<userLogoutInboundPortOutputDto> {
    const userId = { userId: req.user } as userLogoutInboundPortInputDto;
    return await this.userLogoutInboundPort.execute(userId);
  }

  //------------------------------------------------------------
  @UseGuards(AuthJwtGuard)
  @Get('read')
  async read(
    @Req()
    req: Request,
  ) {
    const params: UserReadInboundPortInputDto = { userId: req.user as string };
    return await this.userReadInboundPort.execute(params);
  }

  //------------------------------------------------------------

  @UseGuards(AuthJwtGuard)
  @Get('readById')
  async readById(
    @Query('userId')
    query,
  ) {
    const params: UserReadInboundPortInputDto = { userId: query };
    return await this.userReadInboundPort.execute(params);
  }

  //------------------------------------------------------------

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
          done(null, `obo-user-profile/${Date.now()}_${basename}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @UseGuards(AuthJwtGuard)
  @Post('update')
  async update(
    @Req() req: Request,
    @Body() body: any,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const params: UserUpdateInboundPortInputDto = {
      userId: req.user as string,
      nickname: body.nickname,
      profileImg: image ? image.location : process.env.PRODUCT_DEFAULT_IMAGE,
    };
    return await this.userUpdateInboundPort.execute(params);
  }
}
