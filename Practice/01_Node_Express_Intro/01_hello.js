// Load HTTP module
const http = require("http");

const hostName = "127.0.0.1";
const port = "8000";

// Create HTTP Server
const server = http.createServer((req, res) => {
	// Set the response HTTP header with HTTP status code and content type
	res.writeHead(200, { "Content-Type": "text/plain" });

	// Send the response body "Hello World"
	res.end("Hello Word\n");
});

// Prints a log once the server starts listening
server.listen(port, hostName, () => {
	console.log(`Server is listening at http://${hostName}:${port}`);
});

// Run on console node 01_hello.js
// Press 'ctrl + c' to stop the server on the terminal

