const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8000 });

server.on("connection", (socket) => {
    console.log("Client connected");
    console.log(`Total number of clients: ${server.clients.size}`);

    socket.send("Welcome to the WebSocket server!");

    socket.on("message", (message) => {
        console.log(`Received message from client: ${message}`);
        socket.send(`Server response: ${message}`);
    });

    // Send the client count to all connected clients every 5 seconds
    const interval = setInterval(() => {
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`There are ${server.clients.size} clients connected to the server.`);
            }
        });
    }, 5000);

    socket.on("close", () => {
        console.log(`Client disconnected, total number of clients: ${server.clients.size}`);
        clearInterval(interval); // Clean up interval on client disconnect
    });
});

console.log("WebSocket server is running on port 8000");
