import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
require("dotenv").config()


declare global { 
    namespace Express {
        interface Request {
            token?: string;
            authData?: any;
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, process.env.JWT_SECRET!, (err, authData) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(StatusCodes.UNAUTHORIZED).json({ error: "JWT token has expired" })
                } else {
                    res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" })
                }
            } else {
                req.authData = authData
                next()
            }
        })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" })
    }
}