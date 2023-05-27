import { Router } from 'express';
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { myPrisma } from '../myPrisma';
import { myStrategy } from '../../strategy';
require('dotenv').config();

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
    console.log(999999999999999)
    const { email, password } = req.body;
    try{

        console.log(9999)
        const userExists = await myPrisma.user.findUnique({
            where: {
                email: email
            },
        })

        console.log(0)
    
        if (userExists) {
            return next(new Error("User already exists"));
        }

        console.log(1)

        const hashedPassword = await hash(password, 10);

        const newUser = await myPrisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        })
        console.log(2)

        const payload = {
            id: newUser.id,
            email: newUser.email,
        }

        console.log(3)

        const token = sign(payload, process.env.JWT_SECRET as string, { 
            expiresIn: "1m" 
        });

        console.log(4)

        res.status(201).json({ "message" : "User created", "token": token});

        console.log(5)

    } catch (err) {
        return next(new Error("Failed to register user"));
    }
    
})