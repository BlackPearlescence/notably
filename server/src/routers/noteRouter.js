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
exports.noteRouter = void 0;
const express_1 = require("express");
const myPrisma_1 = require("../myPrisma");
const http_status_codes_1 = require("http-status-codes");
exports.noteRouter = (0, express_1.Router)({ mergeParams: true });
exports.noteRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = myPrisma_1.myPrisma.note.findMany();
        res.status(http_status_codes_1.StatusCodes.OK).json(notes);
    }
    catch (err) {
        next(new Error("No notes exist"));
    }
}));
exports.noteRouter.get("/:noteId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = myPrisma_1.myPrisma.note.findUnique({
            where: {
                id: parseInt(req.params.noteId)
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(note);
    }
    catch (err) {
        next(new Error("No note exists with that id"));
    }
}));
exports.noteRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, color } = req.body;
    const { projectId } = req.params;
    try {
        // Create the note
        const note = yield myPrisma_1.myPrisma.note.create({
            data: {
                title: title,
                content: content,
                color: color,
                project: {
                    connect: {
                        id: parseInt(projectId)
                    }
                }
            }
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json(req.body);
    }
    catch (err) {
        next(err);
    }
}));
// noteRouter.post("/", (req, res, next) => {
//     const { title, content, color, userId, }
//     try {
//         const note = myPrisma.note.create({
//             data: {
//                 title: req.body.title,
//                 body: req.body.body
//             }
//         })
//         res.status(StatusCodes.CREATED).json(note);
//     } catch (err) {
//         next(err);
//     }
// })
exports.noteRouter.use((err, req, res, next) => {
    switch (err.message) {
        case "No notes exist":
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(err.message);
            break;
        case "No note exists with that id":
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(err.message);
            break;
        default:
            next(err);
    }
});
