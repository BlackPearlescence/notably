import express from 'express';
import { Router } from 'express';

export const noteRouter = Router();

noteRouter.get('/', (req, res, next) => {
    res.send('Hello World!');
});