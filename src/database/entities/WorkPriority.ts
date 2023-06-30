import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class WorkPriority {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property()
  name!: string;

}
