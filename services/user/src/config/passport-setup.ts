import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from "../models/userModel";
import dotenv from "dotenv";
import AppDataSource from '../data-source';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '1960SecretAuth';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

// Configure passport to use JWT
passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload, done) => {
      try {
        // Fetch user by the ID in the token payload
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: jwt_payload.id } });

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
