import { curry } from '@fxts/core';
import { Entity, EntityRepository } from '@mikro-orm/core';
import { AsyncFunction } from '@mikro-orm/core/typings';
import { EntityManager, SqlEntityRepository } from '@mikro-orm/knex';
import { throwError } from 'rxjs';
import { Users } from 'src/database/entities/Users';

export const findInRepository = (repo: EntityRepository<any>): Function => {
  return async (key: any, keyword: any) => {
    return await repo.findOne({ [key]: keyword });
  };
};
