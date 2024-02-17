import express from 'express';
import { router as listsRouter, indexHandler } from './src/routes/lists.js';

export const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());

app.use('/lists', listsRouter);

app.use('/static', express.static('src/static'));

app.use('/', indexHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

