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

  @Property({ columnType: 'date' })
  startDate!: string;

  @Property({ columnType: 'date' })
  endDate!: string;

  @Property({ length: 255 })
  description!: string;

  @ManyToOne({ entity: () => WorkPriority, fieldName: 'priority' })
  priority!: WorkPriority;

  @ManyToOne({ entity: () => Users, fieldName: 'creator' })
  creator!: Users;

}
