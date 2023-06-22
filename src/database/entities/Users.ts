import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Circles } from './Circles';
import { Hashtags } from './Hashtags';

@Entity()
export class Users {
  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property({ length: 50 })
  email!: string;

  @Property({ length: 100, nullable: true })
  password?: string;

  @Property({ length: 20 })
  nickname!: string;

  @Property({ length: 255, nullable: true })
  profileImg?: string;

  @Property({ length: 200, nullable: true })
  description?: string;

  @Property({ columnType: 'float4', nullable: true })
  progressRoutine?: number;

  @Property({ columnType: 'float4', nullable: true })
  progressTodo?: number;

  @Property({ columnType: 'float4', nullable: true })
  progressWork?: number;

  @Property({ nullable: true })
  authMethod?: string;

  @ManyToMany({
    entity: () => Circles,
    pivotTable: 'circle_application',
    joinColumn: 'user',
    inverseJoinColumn: 'circle',
  })
  circleApplication = new Collection<Circles>(this);

  @ManyToMany({
    entity: () => Circles,
    joinColumn: 'user',
    inverseJoinColumn: 'circle',
  })
  circles = new Collection<Circles>(this);

  @ManyToMany({
    entity: () => Hashtags,
    joinColumn: 'user',
    inverseJoinColumn: 'hashtag',
  })
  hashtags = new Collection<Hashtags>(this);
}
