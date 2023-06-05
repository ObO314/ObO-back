import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Todos {

  [OptionalProps]?: 'completed';

  @PrimaryKey({ columnType: 'int8' })
  todoId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade' })
  userId!: Users;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 6 })
  startTime!: Date;

  @Property({ length: 6 })
  endTime!: Date;

  @Property({ default: false })
  completed: boolean = false;

  @Property({ length: 1000, nullable: true })
  description?: string;

}
