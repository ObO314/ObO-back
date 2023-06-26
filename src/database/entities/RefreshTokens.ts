import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class RefreshTokens {

  @OneToOne({ entity: () => Users, fieldName: 'user', primary: true })
  user!: Users;

  @Property()
  token!: string;

}
