// import { EntityManager } from '@mikro-orm/knex';
// import {
//   RoutineCreateOutboundPort,
//   RoutineCreateOutboundPortInputDto,
//   RoutineCreateOutboundPortOutputDto,
// } from '../outbound-port/routine.create.outbound-port';
// import { Injectable } from '@nestjs/common';
// import { Routines } from 'src/database/entities/Routines';

// @Injectable()
// export class RoutineRepository implements RoutineCreateOutboundPort {
//   constructor(private readonly em: EntityManager) {}
//   async create(
//     params: RoutineCreateOutboundPortInputDto,
//   ): Promise<RoutineCreateOutboundPortOutputDto> {
//     const userId = this.em.findOne(Users, { userId: params.userId });
//     const routine = this.em.create(Routines, {
//       userId: userId,
//       ...params,
//     });
//   }
// }
