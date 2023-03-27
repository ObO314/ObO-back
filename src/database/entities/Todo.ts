import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Todo {

  [OptionalProps]?: 'completed';

  @PrimaryKey({ columnType: 'int8' })
  todoId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id' })
  userId!: Users;

  @Property({ length: 50 })
  name!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6, nullable: true })
  startTime?: Date;

  @Property({ length: 6, nullable: true })
  endTime?: Date;

  @Property({ default: false })
  completed: boolean = false;

}
