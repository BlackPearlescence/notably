"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const morgan_1 = __importDefault(require("morgan"));
const myPrisma_1 = require("./myPrisma");
const projectRouter_1 = require("./routers/projectRouter");
const authRouter_1 = require("./routers/authRouter");
const app = (0, express_1.default)();
const DATABASE_URL = process.env.DATABASE_URL;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/projects", projectRouter_1.projectRouter);
app.use("/auth", authRouter_1.authRouter);
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
process.on("SIGINT", () => {
    console.log("SIGINT: Closing DB connection");
    myPrisma_1.myPrisma.$disconnect();
    process.exit(0);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke (Internal Server Error)!");
});
const port = 9000;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    console.log();
});
