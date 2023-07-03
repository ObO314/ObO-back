import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Users } from './Users';
import { Works } from './Works';

@Entity()
export class WorkRecords {

  @ManyToOne({ entity: () => Works, fieldName: 'work', primary: true })
  work!: Works;

  @ManyToOne({ entity: () => Users, fieldName: 'user', primary: true })
  user!: Users;

  @PrimaryKey()
  date!: string;

}
