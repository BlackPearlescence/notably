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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const myPrisma_1 = require("../myPrisma");
const passport_local_1 = require("passport-local");
const http_status_codes_1 = require("http-status-codes");
const verifyToken_1 = require("../verifyToken");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import hcaptcha from "express-hcaptcha";
require('dotenv').config();
exports.authRouter = (0, express_1.Router)();
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    try {
        const user = yield myPrisma_1.myPrisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return done(null, false, { message: "Incorrect email." });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
exports.authRouter.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield myPrisma_1.myPrisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "User registered successfully!" });
    }
    catch (err) {
        console.error(err);
        next(new Error("Failed to register user."));
    }
}));
exports.authRouter.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return next(Error("Failed to authenticate user."));
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const payload = { id: user.id, email: user.email };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.cookie("notejwt", token, { httpOnly: true });
            return res.json({ message: "Successfully logged in." });
        });
    })(req, res);
}));
exports.authRouter.use((0, cookie_parser_1.default)());
exports.authRouter.get("/check", verifyToken_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    console.log(userId);
    try {
        const user = yield myPrisma_1.myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (err) {
        next(new Error("Failed to verify token"));
    }
}));
exports.authRouter.post("/logout", (req, res, next) => {
    try {
        const token = req.cookies.notejwt;
        res.clearCookie("notejwt");
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Successfully logged out." });
    }
    catch (err) {
        next(new Error("Failed to logout"));
    }
});
exports.authRouter.get("/login-sitekey", (req, res, next) => {
    try {
        res.status(http_status_codes_1.StatusCodes.OK).json({ sitekey: process.env.HCAPTCHA_LOGIN_SITEKEY });
    }
    catch (err) {
        next(new Error("Could not send login sitekey"));
    }
});
exports.authRouter.get("/register-sitekey", (req, res, next) => {
    try {
        res.status(http_status_codes_1.StatusCodes.OK).json({ sitekey: process.env.HCAPTCHA_REGISTRATION_SITEKEY });
    }
    catch (err) {
        next(new Error("Could not send registration sitekey"));
    }
});
// authRouter.post("/register", async (req, res, next) => {
//     const { email, password } = req.body;
//     try{
//         const userExists = await myPrisma.user.findUnique({
//             where: {
//                 email: email
//             },
//         })    
//         if (userExists) {
//             return next(new Error("User already exists"));
//         }
//         const hashedPassword = await hash(password, 10);
//         const newUser = await myPrisma.user.create({
//             data: {
//                 email: email,
//                 password: hashedPassword,
//             }
//         })
//         const payload = {
//             id: newUser.id,
//             email: newUser.email,
//         }
//         const token = sign(payload, process.env.JWT_SECRET as string, { 
//             expiresIn: "1m" 
//         });
//         res.status(201).json({ "message" : "User created", "token": token});
//     } catch (err) {
//         return next(new Error("Failed to register user"));
//     }
// })
