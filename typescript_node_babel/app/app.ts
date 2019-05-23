import express from 'express';

const app: express.Application = express();

app.get('/', (_, res) => {
    res.send('Hello world!');
    const s = "";
});

app.listen(3000, () => {
    console.log('App listening on 3000');
});