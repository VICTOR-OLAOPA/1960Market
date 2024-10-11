import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithRequest } from 'passport-jwt';
import dotenv from "dotenv";
import { getUserById } from "../services/userServiceProxy";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '1960SecretAuth';

const opts: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
  passReqToCallback: true,
};

// Configure passport to use JWT
passport.use(
  new JwtStrategy(
    opts,
    async (req, jwt_payload, done) => {
      try {
         // Get the Bearer token from the request headers
        const token = opts.jwtFromRequest(req); 

        if (!token) {
            return done(null, false); // No token found, authentication failed
        }
        const user = await getUserById(jwt_payload.id, token);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
export default passport;
