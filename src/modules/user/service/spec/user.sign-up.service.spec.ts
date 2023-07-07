import { UserSignUpService } from './../user.sign-up.service';
import * as dotenv from 'dotenv';
import {
  UserReadOutboundPort,
  UserReadOutboundPortInputDto,
  UserReadOutboundPortOutputDto,
} from '../../outbound-port/user.read.outbound-port';
import {
  UserCreateOutboundPort,
  UserCreateOutboundPortInputDto,
  UserCreateOutboundPortOutputDto,
} from '../../outbound-port/user.create.outbound-port';
import { UserSignUpInboundPortOutputDto } from '../../inbound-port/user.sign-up.inbound-port';
import { HttpException, HttpStatus } from '@nestjs/common';

dotenv.config();

describe('UserSignUpService Spec', () => {
  let userSignUpService: UserSignUpService;

  class MockUserReadOutboundPort implements UserReadOutboundPort {
    constructor(private readonly params: UserReadOutboundPortOutputDto) {}
    async execute(
      _: UserReadOutboundPortInputDto,
    ): Promise<UserReadOutboundPortOutputDto> {
      return this.params;
    }
  }

  class MockUserCreateOutboundPort implements UserCreateOutboundPort {
    constructor(private readonly params: UserCreateOutboundPortOutputDto) {}
    async execute(
      _: UserCreateOutboundPortInputDto,
    ): Promise<UserCreateOutboundPortOutputDto> {
      return this.params;
    }
  }

  //------------------------------------------------------------------------------------------

  //   beforeAll(() => {});

  //------------------------------------------------------------------------------------------

  //   beforeEach(() => {});

  //------------------------------------------------------------------------------------------

  //   afterEach(() => {});

  //------------------------------------------------------------------------------------------

  //   afterAll(() => {});

  //------------------------------------------------------------------------------------------

  test('회원가입(로컬) : 정상적인 회원가입', async () => {
    userSignUpService = new UserSignUpService(
      new MockUserReadOutboundPort(null),
      new MockUserCreateOutboundPort({
        id: '1',
        email: 'createLocalTester@obo.com',
        nickname: 'oboNewbie',
        authMethod: 'LOCAL',
      }),
    );

    const params = {
      email: 'createLocalTester@obo.com',
      password: '1q2w3e4r',
      nickname: 'oboNewbie',
      authMethod: 'LOCAL',
    };

    const result: UserSignUpInboundPortOutputDto =
      await userSignUpService.execute(params);

    expect(result).toEqual({
      userId: '1',
      email: 'createLocalTester@obo.com',
      nickname: 'oboNewbie',
    });
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(로컬) : 중복된 이메일로 회원가입 시도', async () => {
    userSignUpService = new UserSignUpService(
      new MockUserReadOutboundPort({
        id: '1',
        email: 'existentUsers@obo.com',
        nickname: 'oboUser',
        authMethod: 'LOCAL',
      }),
      new MockUserCreateOutboundPort(null),
    );

    const params = {
      email: 'existentUsers@obo.com', // 중복된 이메일
      password: '1q2w3e4r',
      nickname: 'oboNewbie',
      authMethod: 'LOCAL',
    };

    expect(async () => await userSignUpService.execute(params)).rejects.toThrow(
      new HttpException('이미 가입된 이메일입니다.', HttpStatus.BAD_REQUEST),
    );
  });

  //------------------------------------------------------------------------------------------

  test('회원가입(로컬) : 비밀번호 없이 회원가입 시도', async () => {
    userSignUpService = new UserSignUpService(
      new MockUserReadOutboundPort(null),
      new MockUserCreateOutboundPort({
        id: '1',
        email: 'createLocalTester@obo.com',
        nickname: 'oboNewbie',
        authMethod: 'LOCAL',
      }),
    );

    const params = {
      email: 'createLocalTester@obo.com',
      password: null, // 로컬 가입인데 비밀번호 미 입력
      nickname: 'oboNewbie',
      authMethod: 'LOCAL',
    };

    expect(async () => await userSignUpService.execute(params)).rejects.toThrow(
      new HttpException('비밀번호를 입력하세요.', HttpStatus.BAD_REQUEST),
    );
  });
  //------------------------------------------------------------------------------------------
});
