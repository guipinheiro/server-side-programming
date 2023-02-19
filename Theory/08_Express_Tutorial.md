<link href="style.css" rel="stylesheet"></link>

# Express tutorial

## Project: Local Library

We will create a Project called Local Library, which consists in a online catalog for a small library, where users can browser books and manage their account. This will cover:

- Use the Express Application Generator tool to create a skeleton website and application.
- Start and stop the Node web server.
- Use a database to store your application's data.
- Create routes for requesting different information, and templates ("views") to render the data as HTML to be displayed in the browser.
- Work with forms.
- Deploy your application to production.

## Basic installations

- Install Express Application Generator

```bash
npm install express-generator -g
```

- Create the project folder (`locallibrary`) and use the template engine `pug`.

```bash
express locallibrary --view=pug
```

- Go to the folder and install all npm packages needed.

```bash
cd locallibrary
npm install
```

- You can start the server by running (this will allow debugging options on your terminal running the console):

```bash
DEBUG=express-locallibrary-tutorial:* npm start
```

- Install nodemon so you don't have to close and open the server each time you change your code and add some scripts to your package.json to

```bash
npm install --save-dev nodemon
```

```json
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=express-locallibrary-tutorial:* npm run devstart"
  },
```

## Using a Database

The best way to interact with a database in Express is by using its native query language (like SQL) or by using a Object Data Model (ODM) or a Object Relational Model (ORM). An ODM/ORM represents the database as JS object, which then are mapped to the underlying database.

The best performance is achieved by using the DB native query language, however it speeds the development if the code is all written in one language and it helps if you need to work with different databases.

In the examples below, we will be using `Mongoose` ODM to handle MongoDB in a asynchronous way.

## MongoDB and Mongoose

MongoDB is an open source NoSQL database that uses a document-object oriented data model. A "collection" of "documents" is analogous to a "table" of "rows" in a relational DB.

Mongoose acts a front end to MongoDB. The combination of these ODM and database is very common on the node community.

### Creating the database skeleton

Our database for the local library books needs some basic information and must be able to filter/sort data:

- Data needed: `Book title`, `author`, `genre`, `ISBN`. Since it should be multiple copies of the same book available, we also need `Globally Unique IDs`, `availability statuses`, etc. Maybe we need to store more data than just the author name, there might be multiple authors with the same or similar names;
- Sorting: we want to be able to sort information based on book title, author, genre, and category.

It also makes sense design our models separating them by object. Maybe we should have models for books, books instances and authors.

We might also use a database for models to represent selection-list options for example. This makes it easier to maintain (if you need to change and does not want to hard-code the options and changes each time they happen).

Now, we need to decide the relationship between our models and fields.

Using a UML diagram, we can define visually our databases, fields and the relationship between them:

![UML Association Diagram of Local Library DBs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose/library_website_-_mongoose_express.png)

### Using Mongoose

To use Mongoose, you need to install it using npm, then require it in your nodeJS file to access the database.

#### **Defining and Creating Models**

Models are defined using `Schema` interface. Schemas allows you to define fields stored in each document along with their validation requirements and default values. You can also define static and instance helper methods to make it easier to work with your data types, define virtual properties (which aren't stored in the database, like making math using specific fields).

Schemas are then compiled into models using `mongoose.model()` method. After creating a model, you can use it to find, create, update, and delete the objects of the given type.

Example of defining a schema:

```js
// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});
```

Above we have a schema named `SomeModelSchema` with 2 fields: `a_string` and `a_date` and their respective types: `String` and `Data`.

Then, after creating a schema, you can use it to create a model:

```js
// Define schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

// Compile model from schema
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);
```

The first argument of `mongoose.model()` is the name of the collection created for that model (mongoose will create a DB collection for the above model `SomeModel`) and the second argument is the schema you want to use in creating the model.

#### **Schema Types (Fields)**

A schema can have an arbitrary number of fields, each one representing a field in the documents stored in MongoDB. Example:

```js
const schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } },
});
```

Some types to be aware:

- `ObjectId`: Represents specific instances of a model in the Database. We can use the `populate()` method to pull the associated info when needed;
- `Mixed`: An arbitrary schema type;
- `[]`: An array of items which you can perform JS array operations on these models (push, pop...). You can have specified types of objects in your array or not.

#### **Validation**

Mongoose has built-in and custom validators, synchronous and asynchronous ones. It allows you to specify both the acceptable range of values and the error message for validation failure.

The built-in validators contains:

- All `SchemaTypes` have the built-in `required` validator. This is used to specify whether the field must be supplied in order to save a document.
- `Numbers` have `min` and `max` validators.
- `Strings` have:
  
  - `enum`: specifies the set of allowed values for the field.
  - `match`: specifies a regular expression that the string must match.
  - `maxLength` and `minLength` for the string.

Example of validators:

```js
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
    required: [true, "Why no eggs?"],
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea", "Water"],
  },
});
```

#### **Virtual Properties**

Virtual properties are document properties you can **get** and **set**, but do not get persistent by mongoDB. Getters are useful for combining and formatting fields, and setters for decomposing a single value into multiple values. You can, for instance, decompose a full name into a first and last name.

#### **Methods and query helpers**

A schema can also have [instance methods](https://mongoosejs.com/docs/guide.html#methods), [static methods](https://mongoosejs.com/docs/guide.html#statics), and [query helpers](https://mongoosejs.com/docs/guide.html#query-helpers).

### Using models

A model represents a collection of documents in the database you can search, while model's instances represent individual documents that you can save and retrieve.

#### **Creating and modifying documents

To create a model you can define an instance of a model and then call `save()`

```js
// Create an instance of model SomeModel
const awesome_instance = new SomeModel({ name: "awesome" });

// Save the new model instance, passing a callback
awesome_instance.save((err) => {
  if (err) return handleError(err);
  // saved!
});
```

Creation of records (as well as updates, deletes, and queries) are **asynchronous** operations – you supply a callback that is called when the operation completes using error-first argument convention, if the API returns some result, it will be provided as the second argument.

Example by using `create()` to define a model instance at the same time as you save it:

```js
SomeModel.create({ name: "also_awesome" }, function (err, awesome_instance) {
  if (err) return handleError(err);
  // saved!
});
```

Every model is associated with one connection (this will be the default connection when using `mongoose.model()`). You create a new connection and call `.model()` on it to create new documents on a different DB.

You can access the fields in the new record using the dot syntax:

```js
// Access model field values using dot notation
console.log(awesome_instance.name); //should log 'also_awesome'

// Change record by modifying the fields, then calling save().
awesome_instance.name = "New cool name";
awesome_instance.save((err) => {
  if (err) return handleError(err); // saved!
});
```

#### **Searching for records**

You can search for records using query methods, specifying the query conditions as a JSON document. You can also use more than one criteria or use RegEx.

```js
const Athlete = mongoose.model("Athlete", yourSchema);

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Athlete.find({ sport: "Tennis" }, "name age", (err, athletes) => {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
});
```

If you specify a callback, as shown above, the query will execute immediately. The callback will be invoked when the search completes.

If you don't specify a callback then the API will return a variable of type Query. You can use this query object to build up your query and then execute it (with a callback) later using the exec() method.

```js
// find all athletes that play tennis
const query = Athlete.find({ sport: "Tennis" });

// selecting the 'name' and 'age' fields
query.select("name age");

// limit our results to 5 items
query.limit(5);

// sort by age
query.sort({ age: -1 });

// execute the query at a later time
query.exec((err, athletes) => {
  if (err) return handleError(err);
  // athletes contains an ordered list of 5 athletes who play Tennis
});
```

Above we've defined the query conditions in the find() method. We can also do this using a where() function, and we can chain all the parts of our query together using the dot operator (.) rather than adding them separately. The code fragment below is the same as our query above, with an additional condition for the age.

```js
Athlete.find()
  .where("sport")
  .equals("Tennis")
  .where("age")
  .gt(17)
  .lt(50) // Additional where query
  .limit(5)
  .sort({ age: -1 })
  .select("name age")
  .exec(callback); // where callback is the name of our callback function.
```

The `find()` method gets all matching records, but often you just want to get one match. The following methods query for a single record:

- `findById()`: Finds the document with the specified id (every document has a unique id).
- `findOne()`: Finds a single document that matches the specified criteria.
- `findByIdAndRemove()`, `findByIdAndUpdate()`, `findOneAndRemove()`, `findOneAndUpdate()`: Finds a single document by id or criteria and either updates or removes it. These are useful convenience functions for updating and removing records.

#### **Working with related documents**

You can create references from one document/model instance to another using `ObjectId` schema field, or from one document to many using an array of `ObjectIds`. The field stores the id of the related model.

Example of authors and stories. An author can have many stories, however a story can have just one author. So you can relate them like this:

```js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = Schema({
  name: String,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }], // one to many, using array
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: "Author" }, // one to one, using just the ObjectId
  title: String,
});

const Story = mongoose.model("Story", storySchema);
const Author = mongoose.model("Author", authorSchema);
```

Now an example creating an author and a story for him

```js
const bob = new Author({ name: "Bob Smith" });

bob.save((err) => {
  if (err) return handleError(err);

  // Bob now exists, so lets create a story
  const story = new Story({
    title: "Bob goes sledding",
    author: bob._id, // assign the _id from our author Bob. This ID is created by default!
  });

  story.save((err) => {
    if (err) return handleError(err);
    // Bob now has his story
  });
});
```

Now, if we want to find the author based on a story title, we can query it:

```js
Story.findOne({ title: "Bob goes sledding" })
  .populate("author") // This populates the author id with actual author information!
  .exec((err, story) => {
    if (err) return handleError(err);
    console.log("The author is %s", story.author.name);
    // prints "The author is Bob Smith"
  });
```

Note: We added an author to our story, but we didn't do anything to add our story to our author's stories array. How then can we get all stories by a particular author? One way would be to add our story to the stories array, but this would result in us having two places where the information relating authors and stories needs to be maintained.

A better way is to get the `_id` of our author, then use `.find()` to search for this in the author field across all stories.

```js
Story.find({ author: bob._id }).exec((err, stories) => {
  if (err) return handleError(err);
  // returns all stories that have Bob's id as their author.
});
```

### One schema/model per file

It is recommended to have one schema/model per file (module), even though you can have multiples in the same. This helps your code maintenance, then exporting the method to create the model:

```js
// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("SomeModel", SomeModelSchema);
```

```js
// Create a SomeModel model just by requiring the module
const SomeModel = require("../models/somemodel");

// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find(callback_function);
```

## Routes and Controllers

After connecting to the database, now we need to create the routes that will get that information and present it to the user. So, we need to:

1. Determine what information will be displayed to the user;
2. Define the appropriate URLs for returning those resources;
3. Create Routes (URL handlers) and views (templates) to display those pages.

Data flow:

![Data flow](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png)

- Routes to forward supported requested (and any information encoded in requests URLs) to appropriate controllers functions;
- Controllers funcs. to get the requested data from the models, create HTML page displaying the data, and return it to the user in the browser;
- Views (templates) used by the controllers to render data;

Basically, we need pages to display data on books, authors, book instances, and genres. Besides displaying, we also need pages to create, update and delete records.

### What are routes?

Routes are a section of Express that associates an `HTTP` verb, a URL pattern/path, and a function that is called to handle that pattern.

Example of a route that is a module exported into the application:

```js
// wiki.js - Wiki route module.

const express = require("express");
const router = express.Router();

// Home page route using get http verb to that route
router.get("/", function (req, res) {
  res.send("Wiki home page");
});

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;
```

Used in the app:

```js
const wiki = require("./wiki.js");
// …
app.use("/wiki", wiki);
```

### Routes path

Paths can be strings or can be **patterns** (kinda like RegEx). This helps maintaining the paths once you may have similar routes that leads to the same response:

- `?`: The endpoint must have 0 or 1 of the preceding character (or group). `'/ab?cd/'` matches both `acd` or `abcd` ;
- `+`: The endpoint must have 1 or more of the preceding character (or group) `'/ab+cd'` will match endpoints `abcd`, `abbcd`, `abbbcd` ...;
- `*`: The endpoint may have an arbitrary string where the `*` character is placed. E.g. a route path of `'/ab*cd'` will match endpoints `abcd`, `abXcd`, `abSOMErandomTEXTcd`...;
- `()`: Grouping match on a set of characters to perform another operation on, e.g. `'/ab(cd)?e'` will perform a `?`-match on the group `(cd)` — it will match `abe` and `abcde`.

They can be also JS RegEx:

```js
app.get(/.*fish$/, function (req, res) {
  // …
});
```

### Route parameters

You can create *named URL segments* used to capture values at specific positions in the URL. They are prefixed with a colon (`:`) and then the name (`/:your_parameter_name/`). Value are store in the req.params object using parameters names as keys (`req.params.your_parameter_name`).

Consider the URL `http://localhost:3000/users/34/books/8989`. We can extract this information by using Route parameters:

```js
app.get("/users/:userId/books/:bookId", (req, res) => {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
});
```

Req parameters must be a word characters: [`A-Za-z0-9_`] or[`\w`].

> Note: Express allows you to construct your URLs any way you like — you can encode information in the body of the URL as shown above or use URL GET parameters (e.g. `/book/?id=6`). Whichever approach you use, the URLs should be kept clean, logical and readable.

## Displaying data

### Asynchronous flow control using async

Since some controller code of a server may have multiple asynchronous requests, we should also install the `async` node module to help with them. Some important functions of it are:

- `async.parallel()`: execute any actions that must be performed in parallel;
- `async.series()`: ensure that asynchronous operations are performed in series;
- `async.waterfall()`: for operations that must run on series, but depend on each preceding operation.

### Why async is needed?

Suppose you need to render a page based on a asynchronous requests of your mongoDB database. Well, in Express, async operations have a callback that is executed when the requested operation is completed. So, if a controller needs to perform **one** async operation to render a page, the implementation is easy – we render the template in the callback. Example:

```js
exports.some_model_count = function (req, res, next) {
  SomeModel.countDocuments(
    { a_model_field: "match_value" },
    function (err, count) {
      // Do something if there is an err.
      // …

      // On success, render the result by passing count into the render function (here, as the variable 'data').
      res.render("the_template", { data: count });
    }
  );
};
```

However, what happens when you have to make multiple asynchronous operations to them load the page? One approach would be to "daisy chain" the requests, kicking off the subsequent
