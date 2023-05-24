import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { noteRouter } from './routers/noteRouter';
require('dotenv').config();
import morgan from 'morgan';
import { myPrisma } from './myPrisma';
import { projectRouter } from './routers/projectRouter';

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(morgan("dev"));
app.use("/notes", noteRouter)
app.use("/projects", projectRouter)

app.get('/', (req, res, next) => {
    res.send('Hello World!');
    }
);

process.on("SIGINT", () => {
    console.log("SIGINT: Closing DB connection");
    myPrisma.$disconnect();
    process.exit(0);
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke (Internal Server Error)!");
})

const port = 9000;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    console.log()
})