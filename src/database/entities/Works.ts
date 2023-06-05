import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Circles } from './Circles';

@Entity()
export class Works {

  @PrimaryKey({ columnType: 'int8' })
  workId!: string;

  @ManyToOne({ entity: () => Circles, fieldName: 'circle_id', onUpdateIntegrity: 'cascade' })
  circleId!: Circles;

  @Property({ length: 50 })
  name!: string;

  @Property({ columnType: 'date' })
  startDate!: string;

  @Property({ columnType: 'date' })
  endDate!: string;

  @Property({ length: 255 })
  description!: string;

}
