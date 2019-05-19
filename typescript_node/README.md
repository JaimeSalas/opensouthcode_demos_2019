https://timonweb.com/posts/how-to-enable-es6-imports-in-nodejs/
https://iamturns.com/typescript-babel/

## Steps

### 1. 

```bash
npm init
```

```bash
npm i typescript -s
```

### 2.

* Create a new script entry for transpile our code.

```json
....
"scripts": {
    "tsc": "tsc"
},
....
```

* This modification allows us to call typescript functions from the command line in the project’s folder. So we can use the following command:

```bash
npm run tsc -- --init
```

* Uncomment __sourceMap__ and __outDir__

### 3. Installig express

```bash
npm i express -S
```

```bash
npm i @types/express -S
```

### 4. With dependencies installed, we add a new folder __app__, and place in __app/app.ts__

```typescript
import express from 'express';

const app: express.Application = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('App listening on 3000');
});
```

### 5. Compiling our solution

```bash
npm run tsc
```

### 6. It would be nice to run our application without transpiling

```bash
npm i ts-node-dev -D
```

* You can run typescript directly on the node with the ts-node package.

* This package is recommended for development only. To make the final deploy in production, always use the javascript version of your project.

* The ts-node is already included as a dependency on another package, ts-node-dev. After installing,ts-node-dev we can run commands that restarts the server whenever a project file changes.

```json
"scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev --respawn --transpileOnly ./app/app.ts",
    "prod": "tsc && node ./build/app.js"
},
```