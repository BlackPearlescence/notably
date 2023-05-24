"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = require("express");
exports.noteRouter = (0, express_1.Router)();
exports.noteRouter.get('/', (req, res, next) => {
    res.send('Hello World!');
});
