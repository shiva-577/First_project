const http = require('http');
const httpProxy = require('http-proxy');

// Define the target URL where requests will be forwarded
const target = 'https://localhost.com';

// Create a new HTTP proxy server
const proxy = httpProxy.createProxyServer({ target });

// Create a new HTTP server to handle incoming requests
const server = http.createServer((req, res) => {
  // Log the incoming request
  console.log(`Proxying request for: ${req.url}`);

  // Forward the request to the target URL
  proxy.web(req, res);
});

// Listen on port 3000 (or any port of your choice)
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
