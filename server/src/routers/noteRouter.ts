import express from 'express';
import { Router } from 'express';
import { myPrisma } from '../myPrisma';
import { StatusCodes } from 'http-status-codes';

export const noteRouter = Router();

noteRouter.get('/', (req, res, next) => {
    try {
        const notes = myPrisma.note.findMany()
        res.status(StatusCodes.OK).json(notes);
    } catch (err) {
        next(new Error("No notes exist"));
    }
});

noteRouter.get("/:id", (req, res, next) => {
    try {
        const note = myPrisma.note.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(StatusCodes.OK).json(note);
    } catch (err) {
        next(new Error("No note exists with that id"));
    }
})

noteRouter.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    switch (err.message) {
        case "No notes exist":
            res.status(StatusCodes.NOT_FOUND).send(err.message);
            break;
        case "No note exists with that id":
            res.status(StatusCodes.NOT_FOUND).send(err.message);
            break;
        default:
            next(err);
    }
})