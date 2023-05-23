import express from 'express';
import {PrismaClient } from '@prisma/client';
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

const port = 9000;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})