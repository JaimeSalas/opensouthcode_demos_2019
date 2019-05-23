## What if we want to debug our code, how we can handle this?

* Edit as follows

```diff
{
  "name": "typescript_node_example",
  "version": "0.0.0",
  "description": "A project to demontrate how to work with TypeScript",
  "main": "index.js",
  "scripts": {
    "tsc": "tsc",
-   "dev": "ts-node-dev --respawn --transpileOnly ./app/app.ts",
+   "dev": "ts-node-dev --inspect --respawn --transpileOnly ./app/app.ts",
    "prod": "tsc && node ./build/app.js"
  },
  "author": "Jaime Salas",
  "license": "MIT",
  "dependencies": {
    "@types/express": "^4.16.1",
    "express": "^4.17.0",
    "typescript": "^3.4.5"
  },
  "devDependencies": {
    "ts-node-dev": "^1.0.0-pre.39"
  }
}

```

* The console will print the following message:

```bash
Using ts-node version 8.1.0, typescript version 3.4.5
Debugger listening on ws://127.0.0.1:9229/fe96c618-78fc-4a0c-a1b7-bd859c2fe3a4
For help, see: https://nodejs.org/en/docs/inspector
```

* Now if we type in __Chrome__, `chrome://inspect`, we can select our running app, in order to work fine, we have to add the app folder to the workspace.
