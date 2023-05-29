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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
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
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.notejwt;
    console.log(token);
    if (!token) {
        return next(new Error("No token provided"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });
        req.userId = decoded.sub;
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.name === "TokenExpiredError") {
                res.clearCookie("notejwt");
                return next(new Error("Token expired"));
            }
            else {
                return next(new Error("Invalid token"));
            }
        }
        else {
            return next(new Error("Unknown error"));
        }
    }
});
exports.verifyToken = verifyToken;
