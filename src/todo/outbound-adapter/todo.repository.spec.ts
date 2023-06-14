import { EntityManager } from '@mikro-orm/knex';
import { TodoRepository } from './todo.repository';

describe('TodoRepository Spec', () => {
  let todoRepository: TodoRepository;
  let mockEntityManager: jest.Mocked<EntityManager>;
});
