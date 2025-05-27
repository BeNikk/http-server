
# Raw HTTP Server in TS

This project demonstrates how to create a basic HTTP server from scratch using Node.js's built-in TCP `net` module - without using any HTTP libraries or frameworks.

## What This Project Does

- Listens for incoming TCP connections on port 8124
- Manually parses raw HTTP request data (method, path, protocol)
- Routes requests based on the URL path (`/`, `/about`, `/profile`)
- Sends back simple HTTP responses with proper headers and body content
- Serves a static HTML file for the `/profile` route
- Handles basic errors and connection lifecycle events
- Logs all incoming request data and connection events to the console