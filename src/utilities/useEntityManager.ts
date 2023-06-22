import { curry } from '@fxts/core';
import { EntityName } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/knex';

export const receiveParamsFindProp =
  (key: string, entity: EntityName<object>, em: EntityManager) =>
  async (params: { [key: string]: any }) => {
    const inner = await em.findOne(entity, { [key]: params[key] });
    return { ...params, [key]: inner };
  };

export const receiveParamsCreateEntity = curry(
  (entity: EntityName<object>, em: EntityManager, params) => {
    const createdEntity = em.create(entity, { ...params });
    return createdEntity;
  },
);

export const receiveEntityPersistAndFlush = curry(
  async (em: EntityManager, entity) => {
    await em.persistAndFlush(entity);
    return entity;
  },
);

export const receiveParamsFindEntity = curry(
  async (entity: EntityName<object>, em: EntityManager, params) => {
    const foundEntities: any = await em.find(entity, params);
    return foundEntities;
  },
);

export const receiveParamsFindOneEntity = curry(
  async (entity: EntityName<object>, em: EntityManager, params) => {
    const foundEntity: any = await em.findOne(entity, params);
    return foundEntity;
  },
);

export const receiveParamsUpsertEntity = curry(
  async (entity: EntityName<object>, em: EntityManager, params) => {
    const upsertedEntity = await em.upsert(entity, {
      ...params,
    });
    return upsertedEntity;
  },
);

export const receiveParamsDeleteEntity = curry(
  async (em: EntityManager, entity) => {
    await em.removeAndFlush(entity);
    return entity;
  },
);
