import express from 'express';
import {PrismaCli}
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