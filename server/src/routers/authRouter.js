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
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const myPrisma_1 = require("../myPrisma");
require('dotenv').config();
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(999999999999999);
    const { email, password } = req.body;
    try {
        console.log(9999);
        const userExists = yield myPrisma_1.myPrisma.user.findUnique({
            where: {
                email: email
            },
        });
        console.log(0);
        if (userExists) {
            return next(new Error("User already exists"));
        }
        console.log(1);
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = yield myPrisma_1.myPrisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        });
        console.log(2);
        const payload = {
            id: newUser.id,
            email: newUser.email,
        };
        console.log(3);
        const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
            expiresIn: "1m"
        });
        console.log(4);
        res.status(201).json({ "message": "User created", "token": token });
        console.log(5);
    }
    catch (err) {
        return next(new Error("Failed to register user"));
    }
}));
