import {
  TodoCreateOutboundPort,
  TodoCreateOutboundPortInputDto,
  TodoCreateOutboundPortOutputDto,
} from '../outbound-port/todo.create.outbound-port';
import { TodoCreateService } from './todo.create.service';

class MockTodoCreateOutboundPort implements TodoCreateOutboundPort {
  private readonly params: TodoCreateOutboundPortOutputDto;

  constructor(params: TodoCreateOutboundPortOutputDto) {
    this.params = params;
  }

  async create(
    params: TodoCreateOutboundPortInputDto,
  ): Promise<TodoCreateOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoCreateService Spec', () => {
  test('투두 생성 : userId 와 내용을 받아 투두 생성', async () => {
    const todoCreateService = new TodoCreateService(
      new MockTodoCreateOutboundPort({
        todoId: '1',
        name: '투두 생성하기',
        startTime: new Date(2023, 6, 1, 10, 30),
        endTime: new Date(2023, 6, 1, 11, 0),
        completed: false,
      }),
    );

    const result = await todoCreateService.create({
      userId: '1',
      name: '투두 생성하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 1, 11, 0),
      completed: false,
    });

    expect(result).toEqual({
      todoId: '1',
      name: '투두 생성하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 1, 11, 0),
      completed: false,
    });
  });
});
