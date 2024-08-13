import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:'QWEASRDTGREDSQW',
    });
  }

  async validate(payload) {
    console.log('JWT Payload:', payload);
    return { userId: payload.sub, email: payload.email, role: payload.role, permissions: payload.permissions };
}

}
