## Now we want to add some unit tests, so for that purpose we're going to use Jest.

* Lets start by adding dependencies

```bash
npm i jest ts-jest supertest @types/jest @types/supertest -D
```

* Ok with this on place, we're going to create a new file that will handle jest configuration. On root folder create:

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
    "dev": "ts-node-dev --inspect --respawn --transpileOnly ./app/app.ts",
    "prod": "tsc && node ./build/app.js",
    "test": "jest --verbose",
    "test:watch": "jest --watchAll --verbose -i", // [1]
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand" // [2]
  },
```

1. Run tests on parallel
2. Will pause its executiom until inspector is listening.

* Lets export __app__, so __supertest__ has access to it:

```diff
import express from 'express';

const app: express.Application = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('App listening on 3000');
});

module.exports = app;
```