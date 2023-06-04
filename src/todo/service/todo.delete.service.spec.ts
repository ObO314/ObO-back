import {
  TodoDeleteOutboundPort,
  TodoDeleteOutboundPortInputDto,
  TodoDeleteOutboundPortOutputDto,
} from '../outbound-port/todo.delete.outbound-port';
import { TodoDeleteService } from './todo.delete.service';

class MockTodoDeleteOutboundPort implements TodoDeleteOutboundPort {
  private readonly params: TodoDeleteOutboundPortOutputDto;
  constructor(params: TodoDeleteOutboundPortOutputDto) {
    this.params = params;
  }
  async delete(
    params: TodoDeleteOutboundPortInputDto,
  ): Promise<TodoDeleteOutboundPortOutputDto> {
    return this.params;
  }
}

describe('TodoDeleteService Spec', () => {
  test('투두 삭제 : UserId, TodoId 를 받아 할 일을 삭제한다.', async () => {
    const todoDeleteService = new TodoDeleteService(
      new MockTodoDeleteOutboundPort({
        todoId: '1',
        name: '필요없어진 할 일',
      }),
    );

    const result = await todoDeleteService.delete({
      userId: '1',
      todoId: '1',
    });

    expect(result).toStrictEqual({
      todoId: '1',
      name: '필요없어진 할 일',
    });
  });
});
