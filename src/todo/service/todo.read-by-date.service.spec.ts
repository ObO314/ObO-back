import { TodoReadByDateOutboundPortInputDto } from './../outbound-port/todo.read-by-date.outbound-port';
import {
  TodoReadByDateOutboundPort,
  TodoReadByDateOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-date.outbound-port';
import { TodoReadByDateService } from './todo.read-by-date.service';

class MockTodoReadByDateOutboundPort implements TodoReadByDateOutboundPort {
  private readonly params: TodoReadByDateOutboundPortOutputDto;
  constructor(params: TodoReadByDateOutboundPortOutputDto) {
    this.params = params;
  }
  async readByDate(
    params: TodoReadByDateOutboundPortInputDto,
  ): Promise<TodoReadByDateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoReadByDateService Spec', () => {
  test('투두 검색 : 기간을 지정하여 불러오기', async () => {
    const todoReadByDateService = new TodoReadByDateService(
      new MockTodoReadByDateOutboundPort([
        {
          todoId: '1',
          name: '오늘 할 일 검색하기',
          startTime: new Date(2023, 6, 1, 12, 30, 0),
          endTime: new Date(2023, 6, 1, 13, 0, 0),
          completed: true,
        },
        {
          todoId: '2',
          name: '오늘 할 일 메모장에 정리하기',
          startTime: new Date(2023, 6, 1, 14, 0, 0),
          endTime: new Date(2023, 6, 1, 15, 0, 0),
          completed: false,
        },
      ]),
    );
    const result = await todoReadByDateService.readByDate({
      userId: '1',
      startTime: new Date(2023, 6, 1, 0, 0, 0),
      endTime: new Date(2023, 6, 2, 0, 0, 0),
    });

    expect(result).toStrictEqual([
      {
        todoId: '1',
        name: '오늘 할 일 검색하기',
        startTime: new Date(2023, 6, 1, 12, 30, 0),
        endTime: new Date(2023, 6, 1, 13, 0, 0),
        completed: true,
      },
      {
        todoId: '2',
        name: '오늘 할 일 메모장에 정리하기',
        startTime: new Date(2023, 6, 1, 14, 0, 0),
        endTime: new Date(2023, 6, 1, 15, 0, 0),
        completed: false,
      },
    ]);
  });
});
