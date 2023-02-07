<link href="style.css" rel="stylesheet"></link>

# Setting up a Node (Express) Development Environment

## What is the Express Development Environment?

It includes the installation of Node.js, npm package manager, and (optionally) the [Express Application Generator](https://expressjs.com/en/starter/generator.html) on your local computer, which follows the [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) software-design principle.

Node and npm are installed together from prepared binary packages, installer, OS package managers or from source. Express, in the other hand, is installed by npm as a dependency of your individual Express Web App (along with DB drivers, template engines, middleware, etc.).

## Using Express Application Generator

Install Express Application Generator and use the command `express "AppName"` (or use the command `npx express-generator "appName"`).

Then, go to the folder created and run `npm install` to install npm dependencies of `package.json` that comes by default from Express App Gen.

And run the program  using `DEBUG=helloworld:* npm start` and go to `http://localhost:3000`.
