import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CommunityQuestion } from './CommunityQuestion';
import { Users } from './Users';

@Entity()
export class CommunityQuestionComments {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @ManyToOne({ entity: () => CommunityQuestion, fieldName: 'question', onUpdateIntegrity: 'cascade' })
  question!: CommunityQuestion;

  @ManyToOne({ entity: () => Users, fieldName: 'user', onUpdateIntegrity: 'cascade' })
  user!: Users;

  @Property({ length: 255 })
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}
