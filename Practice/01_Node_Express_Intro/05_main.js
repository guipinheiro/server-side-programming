import wiki from "./05_wikiRoutes.js";

import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Home Page, try /wiki, then /wiki/about");
});

app.use("/wiki", wiki);

app.listen(port, () => {
	console.log(`Example of express app listening at http://localhost:${port}`);
});

// try /wiki, then /wiki/about one browser URL

