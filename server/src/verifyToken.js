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
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.notejwt;
    console.log(token);
    if (!token) {
        return next(new Error("No token provided"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });
        console.log(decoded);
        req.userId = decoded.id;
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
