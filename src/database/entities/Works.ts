import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Circles } from './Circles';
import { Users } from './Users';
import { WorkPriority } from './WorkPriority';

@Entity()
export class Works {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle', onUpdateIntegrity: 'cascade' })
  circle!: Circles;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 6 })
  startTime!: Date;

  @Property({ fieldName: 'end_Time', length: 6 })
  endTime!: Date;

  @Property({ length: 255 })
  description!: string;

  @ManyToOne({ entity: () => WorkPriority, fieldName: 'priority' })
  priority!: WorkPriority;

  @ManyToOne({ entity: () => Users, fieldName: 'creator' })
  creator!: Users;

  @Property({ columnType: 'int8' })
  targets!: string;

}
