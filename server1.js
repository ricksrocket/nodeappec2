const http = require("http");
const port = 80;
const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain");

  const message = "Hello from Rick"
  res.end(message);
});

server.listen(port, () => {
  console.log(`Server running on 80`);
});
