<link href="style.css" rel="stylesheet"></link>

# Introduction to Node and Express

## Node

Node is a open-source, cross-platform runtime environment for JS that runs in your computer or server OS instead of a browser. It removes browser-specific JS APIs and adds support to more traditional OS APIs, including HTTP and file system libraries.

Node benefits from a web server perspective:

- Great performance;
- Cold is written with plain JS, so less time having to adapt to another language;
- Since JS is a relative new language and benefits from improvements in language design compared to other traditional languages (like Python, or PHP), many other new and popular languages compile/convert into JS so you can use TS, CoffeeScript, ClojureScript, Scala, LiveScript, etc.;
- NPM provides hundreds of thousands of reusable packages;
- Node.js is portable, being available on most OSs (MS, Mac, Linux, Solaris, FreeBSD, OpenBSD, WebOS, and NonStop OS);
- It has a very attractive third party ecosystem and developer community.

Example of web server in node: `../Practice/01_Node_Express_Intro/01_hello.js`.

## Web Frameworks

Other common web-dev tasks are not handled by Node itself. If you want to add specific handling for different HTTP verbs (`GET`, `POST`, `DELETE`...), separately handle requests at different URL paths ("routes"), serve static files, or use templates to dynamically create the response, Node won't be enough own its own. You either create the code for this from scratch, or you can use a web framework.

## Express

Express provides mechanisms to:

- Write handlers for different HTTP verbs at different URL paths (routes);
- Integrate with "view" rendering engines in order to generate responses by inserting data into templates;
- Set common web app settings (connection port, location of templates);
- Add additional requests processing "middleware"

Express itself is very minimalist, but there are a lot of compatible middleware packages that address almost any development problems (cookies, sessions, user logins, URL parameters, `POST` data, security headers etc.). [List of package maintained by Express Team.](https://expressjs.com/en/resources/middleware.html)

### Is Express Opinionated?

Opinionated frameworks have a "right" way of handling any particular task. They often are focused on solving a particular problem. However, they are less flexible at solving problems outside their domain.

Unopinionated frameworks, by contrast, have far fewer restrictions on the best way of solving problems and gluing components together to achieve a goal, or even what components should be used.  They are easier for developers to use the most suitable tools to complete a task, in addition of having to look for those components.

Express is unopinionated.

### What does Express code?

Express provides methods to specify what functions is called for a particular HTTP verb and a URL pattern ("Route"), and methods to specify what template ("view") engine is used, where templates are file are located, and what template should be used to render a certain a response.

You can then use a middleware to add support for cookies, sessions, and users, getting `GET`/`POST` parameters, etc.

And Express lets you use any type of database mechanism supported by Node (Express is database-related agnostic).

Example of hello world in express: `../Practice/01_Node_Express_Intro/02_hello_express.js`

## Create your own modules/libraries

You can also created your own modules. This helps you by organizing your code into different resources so it's easier to maintain than a monolith (basically all your code in one file). The way to do that in node is by creating your modules on separated files, exporting the functions, then importing them.

```js
// File: ../Practice/01_Node_Express_Intro/03_myModule.js

const squareArea = function (width) {
	return width * width;
};

const squarePerimeter = function (width) {
	return width * 4;
};

module.exports = { squareArea, squarePerimeter };

```

And importing them as:

```js
// File: ../Practice/01_Node_Express_Intro/03_myImport.js

const myModule = require("./03_myModule.js");

console.log(myModule.squareArea(3));

console.log(myModule.squarePerimeter(3));
```

Or you can use module JS instead of common JS. (example files `../Practice/01_Node_Express_Intro/04...`).

## Using Asynchronous APIs

JS frequently uses async instead of sync APIs for operations that may take some time to complete. This happens because if you have one request that takes some time, everything else will be blocked until it is completed if your are using a sync API.

Since Node is single threaded, synchronous code will block your whole application. If it ain't needed for the rest to run, you can make it async.

## Creating route handlers

In our Hello World example, we defined a callback function (what happens) for HTTP `GET` request to the site root (`'/'`).

The callback function has two arguments (`REQ` and `RES`) that you can use in it. In this case, we used `res.send("Hello World!")` as the response for out `GET` request to the site root. There are other types of response, such as `.json()` or `.sendFile()` that can be used as a response.

The Express Application object (`express()`) also provides methods to define route handlers for all other HTTP verbs, like:

`checkout()`, `copy()`, **`delete()`**, **`get()`**, `head()`, `lock()`, `merge()`, `mkactivity()`, `mkcol()`, `move()`, `m-search()`, `notify()`, `options()`, `patch()`, **`post()`**, `purge()`, **`put()`**, `report()`, `search()`, `subscribe()`, `trace()`, `unlock()`, `unsubscribe()`.

There is one special routing method `app.all()`, which can be used to respond any type of HTTP method. This is used for loading middleware functions at a particular path for all requests methods.

Routes allow you to match a specific type of pattern in a URL, and extract some values from the URL and pass them as parameters to the route handler (as attributes of the request object passed as an argument).

It is useful to group route handlers for a particular site together and access them using a common route-prefix. To do this in Express, you should use the `express.Router()` object.

Example: `../Practice/01_Node_Express_Intro/05...`

## Using middleware

Whereas route functions and HTTP req-res cycle by returning some response to the HTTP client, middleware functions typically perform some operation on the request and/or response, then call the next function on the stack.

> **Note:** The middleware can perform any operation, execute any code, make changes to the request and response object, and it can also end the request-response cycle. If it does not end the cycle then it must call next() to pass control to the next middleware function (or the request will be left hanging).

Most apps will use third-party middleware in order to simplify common web development tasks like working with cookies, sessions, user authentication, accessing request POST and JSON data, logging, etc.

The **only** difference between middleware function and route handler callback is that a middleware functions have an argument `next`, which middleware functions are expected to call if they not complete the request-response cycle.

You can add a middleware for processing all responses using `app.use()` or for a specific HTTP verb like `app.get`, or `app.post()`. Route is optional in app.use().

Example of middleware using both approaches, and with or without route.

```js
const express = require("express");
const app = express();

// An example middleware function
const a_middleware_function = function (req, res, next) {
  // Perform some operations
  next(); // Call next() so Express will call the next middleware function in the chain.
};

// Function added with use() for all routes and verbs
app.use(a_middleware_function);

// Function added with use() for a specific route
app.use("/someroute", a_middleware_function);

// A middleware function added for a specific HTTP verb and route
app.get("/", a_middleware_function);

app.listen(3000);
```

## Serving Static Files

You can use `express.static()` middleware (which is one of the middleware function that is part of Express like `.json()`, `.raw()`, etc.) to serve static files. You could have a lot of files in, say, a directory called public with files, CSS, JS and HTML files that you wish your users could access. You can just use the `static()` middleware to do this in Express:

```js
app.use(express.static("public"));
```

Any files in the public directory are served by adding their filename (relative to the public directory) to the base URL.

You can use `static()` multiple times for multiple folders.

Example: `../Practice/01_Node_Express_Intro/06_serveStaticFiles.js`

## Handling Errors

Errors are handled by one or more special middleware functions that have four arguments: `(err, req, res, next)`

```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

They can return any content required, however they must be called after all other `app.use()` and routes have being called, so they are the last middleware in the request handling process.

> **Note:** 404 and other error status codes are not treated as error by express, so they are ignored. If you want to handle these errors, you have to use a middleware for it.

[More info on error handling.](https://expressjs.com/en/guide/error-handling.html).

## Using Databases

Express can handle any database supported by Node, like PostgreSQL, MySQL, Redis, SQLite, MongoDB, etc.

To use them, first you need to install the database driver (`npm install mongodb` for instance). After that, you can connect it using express:

```js
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/animals", (err, client) => {
  if (err) throw err;

  const db = client.db("animals");
  db.collection("mammals")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      client.close();
    });
});
```

The DB can be installed locally or in a cloud server, then you can perform CRUD (Create, Read, Update, Delete)operations.

Instead of using the database semantics to access and manipulate the data, you can use a ORM (Object Relational Mapper) to deal with it. The benefit of doing so is that you can still think in terms of the language you are working on and the ORM will do the work of converting the code you write into one the database will understand. Mangoose is one you can use for MongoDB.

## Rendering Data (views)

Template engines ("view engines" by the Express docs) allow you to specify the structure of an output document in a template, using placeholders for data that will be filled when the page is generated, usually HTML, but it could be other formats.

[List of the most famous template engines for JS.](https://colorlib.com/wp/top-templating-engines-for-javascript/)

In you application settings, you should define where Express should look for templates (you need to install your engine to run it).

```js
const express = require("express");
const path = require("path");
const app = express();

// Set directory to contain the templates ('views')
app.set("views", path.join(__dirname, "views"));

// Set view engine to use, in this case 'some_template_engine_name'
app.set("view engine", "some_template_engine_name");
```

The appearance of the template will depend on what engine you use. Assuming that you have a template file named "index.<template_extension>" that contains placeholders for data variables named 'title' and "message", you would call `Response.render()` in a route handler function to create and send the HTML response:

```js
app.get("/", function (req, res) {
  res.render("index", { title: "About dogs", message: "Dogs rock!" });
});
```

[Using templates with Express - Docs.](https://expressjs.com/en/guide/using-template-engines.html)

## File Structure

Express is agnostic, it makes no assumption on what structure or components you use. You can split your application in many files in any number of directories. So, you do not need to worry about a specific file structure your application must have.
