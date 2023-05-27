"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const myPrisma_1 = require("./src/myPrisma");
const options = {
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
const myStrategy = (passport) => {
    passport.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield myPrisma_1.myPrisma.user.findUnique({
                where: {
                    id: payload.id
                }
            });
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        catch (err) {
            console.error(err);
            return done(err, false);
        }
    })));
};
exports.myStrategy = myStrategy;
