import { EntityManager } from '@mikro-orm/knex';
import {
  receiveEntityPersistAndFlush,
  receiveParamsCreateEntity,
  receiveParamsDeleteEntity,
  receiveParamsFindEntity,
  receiveParamsFindOneEntity,
  receiveParamsFindProp,
  receiveParamsUpsertEntity,
} from './useEntityManager';
import {
  Entity,
  EntityName,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

describe('UseEntityManager Util Spec', () => {
  let mockEntityManager: Partial<EntityManager> = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    upsert: jest.fn(),
    persistAndFlush: jest.fn(),
    removeAndFlush: jest.fn(),
  };

  @Entity()
  class MockUsers {
    @PrimaryKey({ columnType: 'int8' })
    userId!: string;
    @Property({ length: 50 })
    email!: string;
  }

  @Entity()
  class MockTodos {
    @PrimaryKey({ columnType: 'int8' })
    todoId!: string;
    @ManyToOne({ entity: () => MockUsers, fieldName: 'user_id' })
    userId!: MockUsers;
    @Property({ length: 50 })
    name!: string;
  }

  //----------------------------------------------------------------------

  test('receiveParamsFindProp', async () => {
    jest
      .spyOn(mockEntityManager, 'findOne')
      .mockImplementation(async (entity, params: any) =>
        params.userId === '123'
          ? {
              userId: '123',
              email: 'testMockEmail@obo.com',
            }
          : undefined,
      );

    const params = { todoId: '1', userId: '123', name: 'todoSomething' };

    const result = await receiveParamsFindProp(
      'userId',
      MockUsers,
      mockEntityManager as EntityManager,
    )(params);

    expect(result).toEqual({
      todoId: '1',
      userId: {
        userId: '123',
        email: 'testMockEmail@obo.com',
      },
      name: 'todoSomething',
    });
  });

  //----------------------------------------------------------------------

  test('receiveParamsCreateEntity', async () => {
    jest
      .spyOn(mockEntityManager, 'create')
      .mockImplementation(
        async (entity: EntityName<object>, params: object) => {
          return params;
        },
      );

    const params = { userId: '123', email: 'testMockEmail@obo.com' };

    const result = await receiveParamsCreateEntity(
      MockUsers,
      mockEntityManager as EntityManager,
      params,
    );

    expect(result).toEqual(params);
  });

  //----------------------------------------------------------------------

  test('receiveEntityPersistAndFlush', async () => {
    jest
      .spyOn(mockEntityManager, 'persistAndFlush')
      .mockImplementation(async (entity: object) => {});

    const params = { userId: '123', email: 'testMockEmail@obo.com' };

    const result = await receiveEntityPersistAndFlush(
      mockEntityManager as EntityManager,
      params,
    );

    expect(result).toEqual(params);
  });

  //----------------------------------------------------------------------

  test('receiveParamsFindEntity', async () => {
    jest
      .spyOn(mockEntityManager, 'find')
      .mockImplementation(async (entity, params: any) =>
        params.userId === '123'
          ? [
              {
                todoId: '1',
                userId: {
                  userId: '123',
                  email: 'testMockEmail@obo.com',
                },
                name: 'todoSomething1',
              },
              {
                todoId: '3',
                userId: {
                  userId: '123',
                  email: 'testMockEmail@obo.com',
                },
                name: 'todoSomething2',
              },
            ]
          : undefined,
      );
    const params = { userId: '123', email: 'testMockEmail@obo.com' };

    const result = await receiveParamsFindEntity(
      MockTodos,
      mockEntityManager as EntityManager,
      params,
    );

    expect(result).toEqual([
      {
        todoId: '1',
        userId: {
          userId: '123',
          email: 'testMockEmail@obo.com',
        },
        name: 'todoSomething1',
      },
      {
        todoId: '3',
        userId: {
          userId: '123',
          email: 'testMockEmail@obo.com',
        },
        name: 'todoSomething2',
      },
    ]);
  });

  //----------------------------------------------------------------------

  test('receiveParamsFindOneEntity', async () => {
    jest
      .spyOn(mockEntityManager, 'findOne')
      .mockImplementation(async (entity, params: any) =>
        params.userId === '123'
          ? {
              userId: '123',
              email: 'testMockEmail@obo.com',
            }
          : undefined,
      );

    const params = { todoId: '1', userId: '123', name: 'todoSomething' };

    const result = await receiveParamsFindOneEntity(
      MockUsers,
      mockEntityManager as EntityManager,
      params,
    );

    expect(result).toEqual({
      userId: '123',
      email: 'testMockEmail@obo.com',
    });
  });

  //----------------------------------------------------------------------

  test('receiveParamsUpsertEntity', async () => {
    jest
      .spyOn(mockEntityManager, 'upsert')
      .mockImplementation(async (entity, params: any) => {
        return params;
      });

    const params = { todoId: '1', userId: '123', name: 'upsertTodoName' };

    const result = await receiveParamsUpsertEntity(
      MockTodos,
      mockEntityManager as EntityManager,
      params,
    );

    expect(result).toEqual({
      todoId: '1',
      userId: '123',
      name: 'upsertTodoName',
    });
  });

  //----------------------------------------------------------------------

  test('receiveParamsDeleteEntity', async () => {
    jest
      .spyOn(mockEntityManager, 'removeAndFlush')
      .mockImplementation(async (entity) => {});

    const params = { todoId: '1', userId: '123', name: 'upsertTodoName' };

    const result = await receiveParamsDeleteEntity(
      mockEntityManager as EntityManager,
      params,
    );

    expect(result).toEqual({
      todoId: '1',
      userId: '123',
      name: 'upsertTodoName',
    });
  });
});
