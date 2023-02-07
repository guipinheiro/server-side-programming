// Load HTTP Module
import http from "http";

const hostname = "127.0.0.1";
const port = 3000;

// Create HTTP server and listen in port 3000
const server = http.createServer((req, res) => {
	// Set the response HTTP header with HTTP status and content type
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello World!");
});

// Listen for request on port 3000, as a callback with have a log that shows if the server is listening or not
server.listen(port, hostname, () => {
	console.log(`Server is listening at http://${hostname}:${port}`);
});

