## Creating a babel node and typescript environment

* Install the following dependencies:

```bash
npm i cross-env @babel/cli @babel/core @babel/preset-env @babel/preset-typescript @babel/register @types/express -D
```
## We have two main points to cover here:

1. Compiles on the fly for a better development expirence
2. Create build

### 1. Compiles on the fly

* First we have to create an entry to tell __@babel/registry__ what files has to process, this entry will be the start point of our application on dev time.

```javascript
require('@babel/register')({
    extensions: ['.js', '.ts'],
});

module.exports = require('./app');
```

* __babel__ splits works in pipeline, using little programs to transform our code. These little programs are know as plugins. A presset is a set of plugins.
* So in order to transform the typescript code, we will use __@babel/preset-typescript__. We want to add support as well to still processing __.js files__, in order to achieve this we add __@babel/preset-env__.

* Lets add __.babelrc__ file on route.

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ]
}

```

* Only with this tiny setup we're ready to compile typescript on the fly. Lets modify the __package.json__ to achieve this.


```json
"scripts": {
    "start": "node ./app/index.js"
},
```

* Lets try it.

### 2. Creating build

* We already have all that we need to create our build, we just have to modify __package.json__ with a new entry:

```json
"scripts": {
    "start": "node ./app/index.js",
    /*diff*/
    "build": "cross-env BABEL_ENV=es babel ./app --out-dir ./build --extensions '.ts'"
    /*diff*/
},
```
* We are using __cross-env__ in order to avois issues between OS's.
* Now we can we give it a try

```bash
node build/app.js
```

### 3. Everything looks nice, but we do have hot reloading? The answer it's not. If we run "npm start" and try to modify app.ts, we will check out that there is not a new build.

* Lets fix this by adding __nodemon__

```bash
npm i nodemon -D
```

* With this package included, we can modify __package.json__ again:

```json
"scripts": {
    "start": "node ./app/index.js",
    "build": "cross-env BABEL_ENV=es babel ./app --out-dir ./build --extensions '.ts'",
    /*diff*/
    "dev": "nodemon --watch app app/index.js -e js,ts"
    /*diff*/
}
```
* Lets give it a try:

```bash
npm run dev
```
* Now when we modify our files under __app folder__ a new build runs and __nodemon__ take cares of restarting our server.

### 4. Ok, but what about debugging? Well, hopefuly it's just a setting in nodemon

```diff
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./app/index.js",
-   "dev": "nodemon --watch app app/index.js -e js,ts",
+   "dev": "nodemon --inspect --watch app app/index.js -e js,ts",
    "build": "cross-env BABEL_ENV=es babel ./app --out-dir ./build --extensions '.ts'"
  },
```