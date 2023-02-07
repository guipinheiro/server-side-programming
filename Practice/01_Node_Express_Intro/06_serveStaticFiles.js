import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Home Page, try /test/test.html or /test/duck.gif");
});

app.use("/test", express.static("public"));

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

