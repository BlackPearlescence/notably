import { Router } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { myPrisma } from '../myPrisma';
import { Strategy as MyStrategy } from "passport-local";
import { StatusCodes } from 'http-status-codes';
import { User } from '@prisma/client';
require('dotenv').config();

export const authRouter = Router();

passport.use(
    new MyStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            console.log(email)
            try {
                const user = await myPrisma.user.findUnique({
                    where: { email }
                });
                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }
                const isValidPassword = await bcrypt.compare(password, user.password);
                if(!isValidPassword) {
                    return done(null, false, { message: "Incorrect password."});
                }
                return done(null, user)
            } catch(err) {
                return done(err)
            }
        }
    )
)

authRouter.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email,password)
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await myPrisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(StatusCodes.CREATED).json({ message: "User registered successfully!"})
    } catch(err) {
        console.error(err)
        next(new Error("Failed to register user."))
    }
})


authRouter.post("/login", async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err: Error, user: User, info: any) => {
        if(err || !user) {
            return next(Error("Failed to authenticate user."))
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err)
            }
            const payload = { id: user.id, email: user.email }
            const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                expiresIn: "1m",
            })
            res.cookie("notejwt", token, { httpOnly: true });
            return res.json({ message: "Successfully logged in."})
        });
    })(req, res)
})

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