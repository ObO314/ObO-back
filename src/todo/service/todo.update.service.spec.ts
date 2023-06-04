import {
  TodoUpdateOutboundPort,
  TodoUpdateOutboundPortInputDto,
  TodoUpdateOutboundPortOutputDto,
} from '../outbound-port/todo.update.outbound-port';
import { TodoUpdateService } from './todo.update.service';

class MockTodoUpdateOutboundPort implements TodoUpdateOutboundPort {
  private readonly params: TodoUpdateOutboundPortOutputDto;
  constructor(params: TodoUpdateOutboundPortOutputDto) {
    this.params = params;
  }
  async update(
    params: TodoUpdateOutboundPortInputDto,
  ): Promise<TodoUpdateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoUpdateSerivce Spec', () => {
  test('투두 수정 : TodoId, UserId, 내용을 받아 할 일를 수정한다.', async () => {
    const todoUpdateService = new TodoUpdateService(
      new MockTodoUpdateOutboundPort({
        todoId: '1',
        name: '할 일 내일 거 까지 정리하기',
        startTime: new Date(2023, 6, 1, 10, 30),
        endTime: new Date(2023, 6, 2, 11, 0),
        completed: true,
      }),
    );

    const result = await todoUpdateService.update({
      userId: '1',
      todoId: '1',
      name: '할 일 내일 거 까지 정리하기',
      endTime: new Date(2023, 6, 2, 11, 0),
      completed: true,
    });

    expect(result).toStrictEqual({
      todoId: '1',
      name: '할 일 내일 거 까지 정리하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 2, 11, 0),
      completed: true,
    });
  });
});
