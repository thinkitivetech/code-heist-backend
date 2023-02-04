import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { Strategy, ExtractJwt } from 'passport-jwt'
import * as passport from "passport";
import { Middleware } from "routing-controllers";
@Middleware({ type: 'before' })
export class JWTAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    applyPassportStrategy()
    next();
  }

}

export const applyPassportStrategy = () => {
  const options = {} as any;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET_KEY;
  passport.use(new Strategy(
    options, function (payload, done) {
      if (payload) {

        return done(null, {
          email: payload.email,
          roles: payload.role
        })
      }
      return done(null, false)
    }
  ))
}
