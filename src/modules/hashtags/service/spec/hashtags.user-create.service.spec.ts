import { HashtagsUserCreateInboundPortInputDto } from '../../inbound-port/hashtag.users-hashtags-create.inbound-port';
import {
  HashtagsCreateOutboundPort,
  HashtagsCreateOutboundPortInputDto,
  HashtagsCreateOutboundPortOutputDto,
} from '../../outbound-port/hashtag.create.outbound-port';
import { HashtagsUserCreateService } from '../hashtag.users-hashtags-create.service';

class MockHashtagsCreateOutboundPort implements HashtagsCreateOutboundPort {
  constructor(private readonly params: HashtagsCreateOutboundPortOutputDto) {}
  async create(
    params: HashtagsCreateOutboundPortInputDto,
  ): Promise<HashtagsCreateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('hashtagsUser Create Service Spec', () => {
  beforeAll(() => {});

  test('해시태그(유저) : 유저가 해시태그를 새롭게 추가합니다.', async () => {
    const hashtagsUserCreateService = new HashtagsUserCreateService(
      new MockHashtagsCreateOutboundPort({
        hashtagId: '1',
        hashtagName: 'CRAZYHASHTAG',
        mentions: '1',
      }),
    );

    const params: HashtagsUserCreateInboundPortInputDto = {
      userId: '1',
      hashtag: 'CRAZYHASHTAG',
    };

    const result = await hashtagsUserCreateService.create(params);

    expect(result).toStrictEqual({
      hashtagId: '1',
      hashtagName: 'CRAZYHASHTAG',
      mentions: '1',
    });
  });

  test('해시태그(유저) : 유저가 해시태그를 새롭게 추가합니다. 띄어쓰기를 제거하고 대문자로 변경합니다.', async () => {
    const hashtagsUserCreateService = new HashtagsUserCreateService(
      new MockHashtagsCreateOutboundPort({
        hashtagId: '1',
        hashtagName: 'CRAZYHASHTAG',
        mentions: '1',
      }),
    );

    const params: HashtagsUserCreateInboundPortInputDto = {
      userId: '1',
      hashtag: 'Crazy Hashtag',
    };

    const result = await hashtagsUserCreateService.create(params);

    expect(result).toStrictEqual({
      hashtagId: '1',
      hashtagName: 'CRAZYHASHTAG',
      mentions: '1',
    });
  });
});
