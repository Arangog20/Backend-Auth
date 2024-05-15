import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators';

import dbConfig from 'src/libs/persistence/db.config';
import { ConfigType } from '@nestjs/config';



@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(dbConfig.KEY) private configService: ConfigType<typeof dbConfig>
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>(); 
    const authHeader = request.header('Auth');
    const  isAuth = authHeader === this.configService.db.apikey;
    if (!isAuth) {
      throw new UnauthorizedException('not allow')
    }
    
    return isAuth;
  }
}
