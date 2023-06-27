import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { parse } from 'url';
import { parse as parseQuery } from 'querystring';

@Injectable()
export class AuthGoogleGuard extends AuthGuard('google') {}
