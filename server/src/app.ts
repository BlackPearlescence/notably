import express from 'express';
import { PrismaClient } from '@prisma/client';
import { noteRouter } from './routers/noteRouter';
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use("/notes", noteRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.get("/notes", async (req, res, next) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
});

const port = 9000;

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    console.log()
})