import { EntityManager } from '@mikro-orm/postgresql';
import { UserRepository } from './user.repository';
import { LOCAL } from '../../auth/strategy/auth.local.strategy';
import { Users } from '../../database/entities/Users';
import { GOOGLE } from '../../auth/strategy/auth.google.strategy';

describe('UserRepository Spec', () => {
  let userRepository: UserRepository;
  let mockEntityManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockEntityManager = {
      findOne: jest.fn(),
      create: jest.fn(),
      persistAndFlush: jest.fn(),
      assign: jest.fn(),
    } as any;

    userRepository = new UserRepository(mockEntityManager);
  });

  //------------------------------------------------------------
  //------------------------------------------------------------

  describe('signUpLocal', () => {
    test('회원가입 : 가입 가능한 이메일', async () => {
      const params = {
        email: 'test@obo.com',
        password: '1q2w3e4r',
        nickname: 'oboBackend',
        authMethod: LOCAL,
      };

      mockEntityManager.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          userId: '1',
          email: 'test@obo.com',
          password: '1q2w3e4r',
          nickname: 'oboBackend',
        });

      const result = await userRepository.signUpLocal(params);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        email: params.email,
        authMethod: LOCAL,
      });

      expect(mockEntityManager.create).toHaveBeenCalledWith(
        Users,
        expect.objectContaining(params),
      );

      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(Users);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        email: params.email,
        authMethod: LOCAL,
      });

      expect(result).toStrictEqual({
        userId: '1',
        email: 'test@obo.com',
        password: '1q2w3e4r',
        nickname: 'oboBackend',
      });
    });

    //------------------------------------------------------------

    test('회원가입 : 이미 가입한 이메일', async () => {
      const params = {
        email: 'test@obo.com',
        password: '1q2w3e4r',
        nickname: 'oboBackend',
        authMethod: LOCAL,
      };

      mockEntityManager.findOne.mockResolvedValue({
        userId: '1',
        email: 'test@obo.com',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        nickname: 'oboBackend',
      });

      let error: Error;

      try {
        const result = await userRepository.signUpLocal(params);
      } catch (e) {
        error = e;
      }

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        email: params.email,
        authMethod: LOCAL,
      });

      expect(error).toBeDefined();

      expect(error.message).toEqual('이미 가입된 이메일입니다.');

      expect(mockEntityManager.create).not.toHaveBeenCalledWith();

      expect(mockEntityManager.create).not.toHaveBeenCalledWith();

      expect(mockEntityManager.persistAndFlush).not.toHaveBeenCalledWith();
    });
    //------------------------------------------------------------
  });

  //------------------------------------------------------------
  //------------------------------------------------------------

  describe('signUpSocial', () => {
    test('소셜가입 : 가입 가능한 소셜 이메일', async () => {
      const params = {
        email: 'whitedayobo@gmail.com',
        nickname: '소셜가입닉네임',
        authMethod: GOOGLE,
      };

      mockEntityManager.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          userId: '1',
          email: 'whitedayobo@gmail.com',
          nickname: '소셜가입닉네임',
        });

      const result = await userRepository.signUpSocial(params);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        email: 'whitedayobo@gmail.com',
        authMethod: GOOGLE,
      });

      expect(mockEntityManager.create).toHaveBeenCalledWith(Users, params);

      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(Users);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        email: 'whitedayobo@gmail.com',
        authMethod: GOOGLE,
      });

      expect(result).toStrictEqual({
        userId: '1',
        email: 'whitedayobo@gmail.com',
        nickname: '소셜가입닉네임',
      });
    });

    //------------------------------------------------------------

    test('소셜가입 : 이미 가입한 소셜 이메일', async () => {
      const params = {
        email: 'whitedayobo@gmail.com',
        nickname: '소셜가입닉네임',
        authMethod: GOOGLE,
      };

      mockEntityManager.findOne.mockResolvedValue({
        userId: '1',
        email: 'test@obo.com',
        nickname: 'oboBackend',
      });

      let error: Error;

      try {
        await userRepository.signUpSocial(params);
      } catch (e) {
        error = e;
      }

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        email: params.email,
        authMethod: GOOGLE,
      });

      expect(error).toBeDefined();

      expect(error.message).toEqual('이미 가입된 소셜 계정입니다.');

      expect(mockEntityManager.create).not.toHaveBeenCalledWith();

      expect(mockEntityManager.create).not.toHaveBeenCalledWith();

      expect(mockEntityManager.persistAndFlush).not.toHaveBeenCalledWith();
    });
  });

  //------------------------------------------------------------
  //------------------------------------------------------------

  describe('read', () => {
    test('유저검색 : 유저Id로 찾기', async () => {
      const params = {
        userId: '1',
      };

      mockEntityManager.findOne.mockResolvedValue({
        userId: '1',
        email: 'backend@obo.com',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        nickname: 'editedname',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        progressRoutine: 0,
        progressTodo: 0,
        progressWork: 0,
        authMethod: 'LOCAL',
      });

      const result = await userRepository.read(params);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, params);

      expect(result).toStrictEqual({
        userId: '1',
        email: 'backend@obo.com',
        nickname: 'editedname',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        progressRoutine: 0,
        progressTodo: 0,
        progressWork: 0,
      });

      //------------------------------------------------------------
    });
    test('가입되지 않은 유저에 대한 검색', async () => {
      const params = {
        userId: '1',
      };

      mockEntityManager.findOne.mockResolvedValue(null);

      let error: Error;

      try {
        await userRepository.read(params);
      } catch (e) {
        error = e;
      }

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        userId: params.userId,
      });

      expect(error).toBeDefined();

      expect(error.message).toEqual('존재하지 않는 사용자 입니다.');

      expect(mockEntityManager.create).not.toHaveBeenCalledWith();

      expect(mockEntityManager.create).not.toHaveBeenCalledWith();

      expect(mockEntityManager.persistAndFlush).not.toHaveBeenCalledWith();
    });
  });

  //------------------------------------------------------------
  //------------------------------------------------------------

  describe('update', () => {
    test('유저 수정 : 유저 닉네임 업데이트하기', async () => {
      const params = {
        userId: '1',
        nickname: '유저업데이트닉네임',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
      };

      const output = {
        userId: '1',
        email: 'backend@obo.com',
        password:
          '$2b$10$zGoIND0XuFXnCA/.cx1zT.df5Vf9364wGspjCM2/r2rexktKvjagu',
        nickname: '바꾸기전닉네임',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        description: null,
        progressRoutine: null,
        progressTodo: null,
        progressWork: null,
        authMethod: 'LOCAL',
      };

      mockEntityManager.findOne.mockResolvedValueOnce(output);

      mockEntityManager.assign.mockImplementation((target, source) => {
        return Object.assign(target, source);
      });
      const result = await userRepository.update(params);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(Users, {
        userId: params.userId,
      });

      expect(mockEntityManager.assign).toHaveBeenCalledWith(output, {
        nickname: params.nickname,
        profileImg: params.profileImg,
      });

      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(output);

      expect(result).toStrictEqual({
        userId: '1',
        email: 'backend@obo.com',
        nickname: '유저업데이트닉네임',
        profileImg:
          'https://obo-s3.s3.ap-northeast-2.amazonaws.com/obo-user-profile/1686223996746_ObO.profile.jpg',
        progressRoutine: 0,
        progressTodo: 0,
        progressWork: 0,
      });

      //------------------------------------------------------------
    });
  });
});
