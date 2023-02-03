const express = require("express");
// The app object has methods for routing HTTP, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings that controls how the application behaves
const app = express();
const port = 3000;

// Route definition
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example of express app listening at http://localhost:${port}`);
});

