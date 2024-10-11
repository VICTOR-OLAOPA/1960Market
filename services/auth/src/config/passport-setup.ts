import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from "dotenv";
import { getUserById, verifyUserCredentials, getUserByGoogleIdOrCreate } from "../services/userServiceProxy";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '1960SecretAuth';

passport.serializeUser((user: any, done: any) => {
  // Store the user ID in the session
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    // Retrieve the user from the user service using the ID stored in the session
    const user = await getUserById(id); 
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// Configure passport to use JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwt_payload, done) => {
      try {
        // Fetch user by the ID in the token payload
        const user = getUserByGoogleIdOrCreate(jwt_payload.id);

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

// Local Strategy for traditional login (email/password)
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await verifyUserCredentials(email, password);
        if (!user) {
          return done(null, false, { message: "Invalid Credentials" });
        }
        return done(null, user)
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google Strategy for OAuth login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        // Communicate with user service to find or create a user based on Google profile
        const user = await getUserByGoogleIdOrCreate(profile);

        if (!user) {
          return done(null, false, { message: 'Unable to log in with Google' });
        }
    
        // User exists or created successfully, return user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
