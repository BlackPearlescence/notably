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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const noteRouter_1 = require("./routers/noteRouter");
require('dotenv').config();
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const DATABASE_URL = process.env.DATABASE_URL;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/notes", noteRouter_1.noteRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/notes", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield prisma.note.findMany();
    res.json(notes);
}));
const port = 9000;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    console.log();
});
