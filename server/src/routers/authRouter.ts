import { Router } from 'express';
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { myPrisma } from '../myPrisma';
import { myStrategy } from '../../strategy';
require('dotenv').config();

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const userExists = await myPrisma.user.findUnique({
            where: {
                email: email
            },
        })
    
        if (userExists) {
            return next(new Error("User already exists"));
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await myPrisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        })

        const payload = {
            id: newUser.id,
            email: newUser.email,
        }

        const token = sign(payload, process.env.JWT_SECRET as string, { 
            expiresIn: "1m" 
        });

        res.status(201).json({ token: token });

    } catch (err) {
        return next(new Error("Failed to register user"));
    }
    
})