import express from 'express';
import { Router } from 'express';
import { myPrisma } from '../myPrisma';
import { StatusCodes } from 'http-status-codes';
import { Project } from '@prisma/client';
import { noteRouter } from './noteRouter';

export const projectRouter = Router({ mergeParams: true });



projectRouter.get('/', async (req, res, next) => {
    try {
        const projects = await myPrisma.project.findMany()
        res.status(StatusCodes.OK).json(projects);
    } catch (err) {
        next(new Error("No projects exist"));
    }
});

projectRouter.get("/:projectId", async (req, res, next) => {
    try {
        const project = await myPrisma.project.findUnique({
            where: {
                id: parseInt(req.params.projectId)
            }
        })
        res.status(StatusCodes.OK).json(project);
    } catch (err) {
        next(new Error("No project exists with that id"));
    }
})

projectRouter.use("/:projectId/notes", noteRouter)

projectRouter.post("/", async (req, res, next) => {
    // Make title a string
    const { title } = req.body;
    try {
        const project = await myPrisma.project.create({
            data: {
                title: title,
            },
            
        })
        res.status(StatusCodes.CREATED).json(project);
    } catch (err) {
        next(new Error("Failed to create project"));
    }
})

projectRouter.put("/:projectId", async (req, res, next) => {
    const { title } = req.body;
    try {
        const project = await myPrisma.project.update({
            where: {
                id: parseInt(req.params.projectId)
            },
            data: {
                title: title,
            }
        })
        res.status(StatusCodes.OK).json(project);
    } catch (err) {
        next(new Error("Failed to update project"));
    }
})

projectRouter.delete("/:projectId", async (req, res, next) => {
    try {
        const project = await myPrisma.project.delete({
            where: {
                id: parseInt(req.params.projectId)
            }
        })
        res.status(StatusCodes.OK).json(project);
    } catch (err) {
        next(new Error("Failed to delete project"));
    }
})

projectRouter.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    switch (err.message) {
        case "No projects exist":
            res.status(StatusCodes.NOT_FOUND).send(err.message);
            break;
        case "No project exists with that id":
            res.status(StatusCodes.NOT_FOUND).send(err.message);
            break;
        case "Failed to create project":
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
            break;
        case "Failed to update project":
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
            break;
        case "Failed to delete project":
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
            break;
        default:
            next(err);
    }

})