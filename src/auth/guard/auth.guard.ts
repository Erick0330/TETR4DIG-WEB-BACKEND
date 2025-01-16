import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from 'src/config';


@Injectable()
 export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ){}
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    console.log(token)
    if(!token){
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: envs.jwtConstants.secret,
      });
      console.log("Request.user sin pay load: " + request.user)
      request.user = payload;
      console.log(request.user)
    } catch (error) {
      console.log('entrooooo')
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      console.log("Authorization header missing");
      return undefined;
    }
  
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      console.log("Authorization header has incorrect type:", type);
      return undefined;
    }
  
    console.log("Extracted token:", token);
    return token;
  }

}
