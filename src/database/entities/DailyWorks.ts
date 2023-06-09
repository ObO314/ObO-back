import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';
import { Works } from './Works';

@Entity()
export class DailyWorks {

  [OptionalProps]?: 'completed';

  @ManyToOne({ entity: () => Works, fieldName: 'work', onUpdateIntegrity: 'cascade', primary: true })
  work!: Works;

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade', primary: true })
  user!: Users;

  @PrimaryKey({ columnType: 'date' })
  date!: string;

  @Property({ length: 6, nullable: true })
  startTime?: Date;

  @Property({ length: 6, nullable: true })
  endTime?: Date;

  @Property({ default: false })
  completed: boolean = false;

}
