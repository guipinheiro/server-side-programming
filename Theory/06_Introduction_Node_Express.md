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
