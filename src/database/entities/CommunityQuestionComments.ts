import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CommunityQuestion } from './CommunityQuestion';
import { Users } from './Users';

@Entity()
export class CommunityQuestionComments {

  @PrimaryKey({ columnType: 'int8' })
  commentId!: string;

  @ManyToOne({ entity: () => CommunityQuestion, fieldName: 'question_id' })
  questionId!: CommunityQuestion;

  @ManyToOne({ entity: () => Users, fieldName: 'user_id' })
  userId!: Users;

  @Property()
  comment!: string;

  @Property({ columnType: 'date' })
  date!: string;

  @Property({ length: 6 })
  time!: Date;

}