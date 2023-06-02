import express from 'express';
import { Router } from 'express';
import { myPrisma } from '../myPrisma';
import { StatusCodes } from 'http-status-codes';
import { Project } from '@prisma/client';
import { noteRouter } from './noteRouter';

export const projectRouter = Router({ mergeParams: true });



projectRouter.get('/:userId', async (req, res, next) => {
    try {
        const user = await myPrisma.user.findUnique({
            where: {
                id: parseInt(req.params.userId)
            },
            include: {
                projects: true,
                sharedProjects: true
            }
        })
        if(user) {
            res.status(StatusCodes.OK).json({
                projects: user.projects,
                sharedProjects: user.sharedProjects
            });
        } else {
            next(new Error("Failed to find user"));
        }
    } catch (err) {
        next(new Error("No projects exist"));
    }
});

projectRouter.get("/myprojects/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                projects: true
            }
        })
        if (user) {
            res.status(StatusCodes.OK).json(user.projects);
        }
    } catch {
        next(new Error("Failed to find user"));
    }
})

projectRouter.get("/sharedprojects/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                sharedProjects: true
            }
        })
        if (user) {
            res.status(StatusCodes.OK).json(user.sharedProjects);
        }
    } catch {
        next(new Error("Failed to find user"));
    }
})

projectRouter.get("/project/:projectId", async (req, res, next) => {
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
    const { title, userId } = req.body;
    try {
        const user = await myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        })
        if (user) {
            const project = await myPrisma.project.create({
                data: {
                    title: title,
                    createdBy: {
                        connect: {
                            id: user.id
                        }
                    }
                },
            })
            res.status(StatusCodes.CREATED).json(project);
        } else {
            next(new Error("Failed to find user"))
        }
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