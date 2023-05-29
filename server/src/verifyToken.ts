import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
require("dotenv").config()


declare global { 
    namespace Express {
        interface Request {
            token?: string;
            authData?: any;
            userId: string | (() => string) | undefined;
        }
    }
}

// export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//     const bearerHeader = req.headers["authorization"];

//     if (typeof bearerHeader !== "undefined") {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;

//         jwt.verify(req.token, process.env.JWT_SECRET!, (err, authData) => {
//             if (err) {
//                 if (err.name === "TokenExpiredError") {
//                     res.status(StatusCodes.UNAUTHORIZED).json({ error: "JWT token has expired" })
//                 } else {
//                     res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" })
//                 }
//             } else {
//                 req.authData = authData
//                 next()
//             }
//         })
//     } else {
//         res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" })
//     }
// }

export const verifyToken = async (req: Request, res: Response , next: NextFunction) => {
    const token = req.cookies.notejwt;
    console.log(token);
    if(!token) {
        return next(new Error("No token provided"));
    } 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!, { ignoreExpiration: false });
        req.userId = decoded.sub;
        next();
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === "TokenExpiredError") {
                res.clearCookie("notejwt");
                return next(new Error("Token expired"))
            } else {
                return next(new Error("Invalid token"))
            }
        } else {
            return next(new Error("Unknown error"))
        }
        
    }
}