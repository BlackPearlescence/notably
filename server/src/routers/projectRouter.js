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
exports.projectRouter = (0, express_1.Router)();
exports.projectRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield myPrisma_1.myPrisma.project.findMany();
        res.status(http_status_codes_1.StatusCodes.OK).json(projects);
    }
    catch (err) {
        next(new Error("No projects exist"));
    }
}));
exports.projectRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield myPrisma_1.myPrisma.project.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(project);
    }
    catch (err) {
        next(new Error("No project exists with that id"));
    }
}));
exports.projectRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Make title a string
    const { title } = req.body;
    try {
        const project = yield myPrisma_1.myPrisma.project.create({
            data: {
                title: title,
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json(project);
    }
    catch (err) {
        next(new Error("Failed to create project"));
    }
}));
exports.projectRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const project = yield myPrisma_1.myPrisma.project.update({
            where: {
                id: parseInt(req.params.id)
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
exports.projectRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield myPrisma_1.myPrisma.project.delete({
            where: {
                id: parseInt(req.params.id)
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
