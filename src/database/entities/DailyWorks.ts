import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';
import { Works } from './Works';

@Entity()
export class DailyWorks {

  [OptionalProps]?: 'completed';

  @ManyToOne({ entity: () => Works, fieldName: 'work_id', onUpdateIntegrity: 'cascade', primary: true })
  workId!: Works;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id', onUpdateIntegrity: 'cascade', primary: true })
  userId!: Users;

  @PrimaryKey({ columnType: 'date' })
  date!: string;

  @Property({ length: 6, nullable: true })
  startTime?: Date;

  @Property({ length: 6, nullable: true })
  endTime?: Date;

  @Property({ default: false })
  completed: boolean = false;

}
