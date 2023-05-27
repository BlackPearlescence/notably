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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jsonwebtoken_1.default.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: "JWT token has expired" });
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
                }
            }
            else {
                req.authData = authData;
                next();
            }
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
    }
});
exports.verifyToken = verifyToken;
