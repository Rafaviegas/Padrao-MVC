import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  // Extrai o token do cabeçalho http e verifica se é valido 
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'jwt-secret', // Verfica se o token é valido ultilizando o JWT secret do nosso .env
    });
  }

  // Retorna o user e email de dentro do token para ser ultilizado depois. 
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
