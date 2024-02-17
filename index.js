import express from 'express';

export const app = express();
const port = 3000;

app.use(express.json());

app.use('/', async (_, res) => {
    console.log('We live');
    res.status(200).send('We are alive');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

