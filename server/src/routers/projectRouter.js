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
exports.projectRouter = void 0;
const express_1 = require("express");
const myPrisma_1 = require("../myPrisma");
const http_status_codes_1 = require("http-status-codes");
const noteRouter_1 = require("./noteRouter");
exports.projectRouter = (0, express_1.Router)({ mergeParams: true });
exports.projectRouter.get('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield myPrisma_1.myPrisma.user.findUnique({
            where: {
                id: parseInt(req.params.userId)
            },
            include: {
                projects: true,
                sharedProjects: true
            }
        });
        if (user) {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                projects: user.projects,
                sharedProjects: user.sharedProjects
            });
        }
        else {
            next(new Error("Failed to find user"));
        }
    }
    catch (err) {
        next(new Error("No projects exist"));
    }
}));
exports.projectRouter.get("/myprojects/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield myPrisma_1.myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                projects: true
            }
        });
        if (user) {
            res.status(http_status_codes_1.StatusCodes.OK).json(user.projects);
        }
    }
    catch (_a) {
        next(new Error("Failed to find user"));
    }
}));
exports.projectRouter.get("/sharedprojects/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield myPrisma_1.myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                sharedProjects: true
            }
        });
        if (user) {
            res.status(http_status_codes_1.StatusCodes.OK).json(user.sharedProjects);
        }
    }
    catch (_b) {
        next(new Error("Failed to find user"));
    }
}));
exports.projectRouter.get("/:projectId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield myPrisma_1.myPrisma.project.findUnique({
            where: {
                id: parseInt(req.params.projectId)
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(project);
    }
    catch (err) {
        next(new Error("No project exists with that id"));
    }
}));
exports.projectRouter.use("/:projectId/notes", noteRouter_1.noteRouter);
exports.projectRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, userId } = req.body;
    try {
        const user = yield myPrisma_1.myPrisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if (user) {
            const project = yield myPrisma_1.myPrisma.project.create({
                data: {
                    title: title,
                    createdBy: {
                        connect: {
                            id: user.id
                        }
                    }
                },
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json(project);
        }
        else {
            next(new Error("Failed to find user"));
        }
    }
    catch (err) {
        next(new Error("Failed to create project"));
    }
}));
exports.projectRouter.put("/:projectId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const project = yield myPrisma_1.myPrisma.project.update({
            where: {
                id: parseInt(req.params.projectId)
            },
            data: {
                title: title,
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(project);
    }
    catch (err) {
        next(new Error("Failed to update project"));
    }
}));
exports.projectRouter.delete("/:projectId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield myPrisma_1.myPrisma.project.delete({
            where: {
                id: parseInt(req.params.projectId)
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(project);
    }
    catch (err) {
        next(new Error("Failed to delete project"));
    }
}));
exports.projectRouter.use((err, req, res, next) => {
    switch (err.message) {
        case "No projects exist":
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(err.message);
            break;
        case "No project exists with that id":
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(err.message);
            break;
        case "Failed to create project":
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err.message);
            break;
        case "Failed to update project":
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err.message);
            break;
        case "Failed to delete project":
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err.message);
            break;
        default:
            next(err);
    }
});
