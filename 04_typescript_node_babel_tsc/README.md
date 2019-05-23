## In this demo we're going to mix a solution with babel and tsc. This will be a complete solution where we will get a complete set up, including testing and debugging features.

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

* Set __"sourceMap": false,__, __"outDir": "./build"__, __"rootDir": "./app",__ in __tsconfig.json__
* Add a new section in our __tsconfig.json__ to exclude tests files.

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

### 6. Lets create an entry to run our built app

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "tsc": "tsc",
    "start:prod": "tsc --build tsconfig.json && node ./build/app.js"
},
```

* __start:prod:debug__ includes source map files, but __start:prod__ not include them. We can achive the same result by removing them after build process, our with a previous script that overrides __tsconfig.json__.  

### 7. Now it's time to include babel to compile our code on the fly. Lets start by adding dependencies

```bash
npm i @babel/cli @babel/core @babel/preset-env @babel/preset-typescript @babel/register -D
```

### 8. To compile our files on the fly, we have to provide babel infrastructure

* First we have to create an entry to tell __@babel/registry__ what files has to process, this entry will be the start point of our application on dev time. Create the following file __app/index.js__.

```javascript
require('@babel/register')({
    extensions: ['.js', '.ts'],
});

module.exports = require('./app');
```

* __babel__ splits works in pipeline, using little programs to transform our code. These little programs are know as plugins. A presset is a set of plugins.
* So in order to transform the typescript code, we will use __@babel/preset-typescript__. We want to add support as well to still processing __.js files__, in order to achieve this we add __@babel/preset-env__.

* Lets add __.babelrc__ file on route folder.

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ]
}

```

* Also we want to hot reloading in our server, lets add __nodemon__ to achieve this.

```bash
npm i nodemon -D
```
* Now lets create a new entry in our __package.json__, the goals that we wnt to achieve, are hot reloading and debugging features

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "tsc": "tsc",
    "start:prod": "tsc --build tsconfig.json && node ./build/app.js",
    /*diff*/
    "start:dev": "nodemon --inspect --watch app app/index.js -e js,ts"
    /*diff*/
},
```

### 9. Now we want to add some unit tests, so for that purpose we're going to use Jest.

* Lets start by adding dependencies

```bash
npm i jest ts-jest supertest @types/jest @types/supertest -D
```

* Ok with this on place, we're going to create a new file that will handle jest configuration.  Create on root folder __jest.config.js__:

```javascript
module.exports = {
    "testEnvironment": "node",
    "testRegex": "\\.spec\\.ts$",
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "transform": {
      ".ts": "ts-jest"
    },
    "restoreMocks": true
}
```

* Lets add a __app/test.spec.ts__ file to check that our configuration is working.

```typescript
describe('simple test', () => {
    it('just pass', () => {
        expect(true).toBeTruthy();
    });
});
```

* Lets add some configurations:

```json
"scripts": {
    "tsc": "tsc",
    "start:prod": "tsc --build tsconfig.json && node ./build/app.js",
    "start:dev": "nodemon --inspect --watch app app/index.js -e js,ts",
    "test": "jest --verbose",
    "test:watch": "jest --watchAll --verbose", // [1]
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand", // [2]
    "test:debug:windows": "node --inspect-brk ./node_modules/jest/bin/jest.js" // [3]
  },
```

1. Run tests on parallel
2. Will pause its executiom until inspector is listening.
3. The same concept as number 2, but for __windows os__

* Lets try the options above

* For last we're going to add an express test using __supertest__. Lets export __app__, so __supertest__ has access to it:

```diff
import express from 'express';

const app: express.Application = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('App listening on 3000');
});

+module.exports = app;
```

* And create the following file __app/app.spec.ts__:

```typescript
import request = require('supertest'); // [1]

describe('root route is working', () => {
    it('responds with 200 status code', (done) => {
        const app = require('./app'); // [2]

        request(app)
            .get('/')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
```

1. We are using here import/require because is more flexible:
    * __import/as__ vs __import/require__
        - These are mostly equivalent, but import * has some restrictions that import ... = require doesn't.
        - import * as creates an identifier that is a module object, emphasis on object. According to the ES6 spec, this object is never callable or newable - it only has properties. If you're trying to import a function or class, you should use: __import express = require('express')__ or (depending on your module loader) __import express from 'express'__
    * Attempting to use import * as express and then invoking express() is always illegal according to the ES6 spec. In some runtime+transpilation environments this might happen to work anyway, but it might break at any point in the future without warning, which will make you sad.

2. We have to use __require__ at this point at code to get the import inside a function.