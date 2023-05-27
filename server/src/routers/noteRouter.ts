import express, { Request } from 'express';
import { Router } from 'express';
import { myPrisma } from '../myPrisma';
import { StatusCodes } from 'http-status-codes';

export const noteRouter = Router({ mergeParams: true });

interface noteRequestParams {
    noteId: string;
    projectId: string;
}


noteRouter.get('/', async (req: Request<noteRequestParams,any,any>, res, next) => {
    try {
        const project = await myPrisma.project.findUnique({
            where: {
                id: parseInt(req.params.projectId)
            },
            include: {
                notes: true
            }
        })

        if (!project) {
            return next(new Error("No project exists with that id"));
        }
        res.status(StatusCodes.OK).json(project.notes);
    } catch (err) {
        next(new Error("No notes exist"));
    }
});

noteRouter.get("/:noteId", async (req, res, next) => {
    try {
        const note = myPrisma.note.findUnique({
            where: {
                id: parseInt(req.params.noteId)
            }
        })
        res.status(StatusCodes.OK).json(note);
    } catch (err) {
        next(new Error("No note exists with that id"));
    }
})





noteRouter.post("/", async (req: Request<noteRequestParams,any,any>, res, next) => {
    const { title, content, color } = req.body;
    const { projectId } = req.params;
    console.log(projectId)
    try {

        // Create the note
        const note = await myPrisma.note.create({
            data: {
                title: title,
                content: content,
                color: color,

                project: {
                    connect: {
                        id: parseInt(projectId)
                    }
                },
                createdBy: {
                    connect: {
                        id: 1
                    }
                },
            }
        })

        res.status(StatusCodes.CREATED).json(note);
    } catch (err) {
        next(err)
    }
})

noteRouter.delete("/:noteId", async (req, res, next) => {
    try {
        const note = await myPrisma.note.delete({
            where: {
                id: parseInt(req.params.noteId)
            }
        })
        res.status(StatusCodes.OK).json(note);
    } catch (err) {
        next(err);
    }
})

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