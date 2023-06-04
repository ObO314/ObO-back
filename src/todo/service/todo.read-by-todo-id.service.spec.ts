import { TodoReadByTodoIdOutboundPortInputDto } from '../outbound-port/todo.read-by-todo-id.outbound-port';
import {
  TodoReadByTodoIdOutboundPort,
  TodoReadByTodoIdOutboundPortOutputDto,
} from '../outbound-port/todo.read-by-todo-id.outbound-port';
import { TodoReadByTodoIdService } from './todo.read-by-todo-id.service';

class MockTodoReadByTodoIdOutboundPort implements TodoReadByTodoIdOutboundPort {
  private params: TodoReadByTodoIdOutboundPortOutputDto;
  constructor(params: TodoReadByTodoIdOutboundPortOutputDto) {
    this.params = params;
  }
  async readByTodoId(
    _: TodoReadByTodoIdOutboundPortInputDto,
  ): Promise<TodoReadByTodoIdOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoReadByTodoIdService Spec', () => {
  test('투두 검색 : todoId로 할 일 받아오기', async () => {
    const todoReadByTodoIdService = new TodoReadByTodoIdService(
      new MockTodoReadByTodoIdOutboundPort({
        todoId: '1',
        name: 'TodoId로 검색하기',
        startTime: new Date(2023, 6, 1, 10, 30),
        endTime: new Date(2023, 6, 1, 11, 0),
        completed: false,
      }),
    );

    const result = await todoReadByTodoIdService.readByTodoId({
      userId: '1',
      todoId: '1',
    });

    expect(result).toStrictEqual({
      todoId: '1',
      name: 'TodoId로 검색하기',
      startTime: new Date(2023, 6, 1, 10, 30),
      endTime: new Date(2023, 6, 1, 11, 0),
      completed: false,
    });
  });
});
