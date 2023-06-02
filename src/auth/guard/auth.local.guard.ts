import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthLocalGuard extends AuthGuard('local') {}
