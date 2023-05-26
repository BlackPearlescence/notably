import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { myPrisma } from "./src/myPrisma";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

export const myStrategy = (passport) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await myPrisma.user.findUnique({
                    where: {
                        id: payload.id
                    }
                })
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch(err) {
                console.error(err)
                return done(err, false);
            }
        })  
    )
}