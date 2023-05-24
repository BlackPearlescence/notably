"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = require("express");
const myPrisma_1 = require("../myPrisma");
const http_status_codes_1 = require("http-status-codes");
exports.noteRouter = (0, express_1.Router)();
exports.noteRouter.get('/', (req, res, next) => {
    try {
        const notes = myPrisma_1.myPrisma.note.findMany();
        res.status(http_status_codes_1.StatusCodes.OK).json(notes);
    }
    catch (err) {
        next(new Error("No notes exist"));
    }
});
exports.noteRouter.get("/:id", (req, res, next) => {
    try {
        const note = myPrisma_1.myPrisma.note.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(note);
    }
    catch (err) {
        next(new Error("No note exists with that id"));
    }
});
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
