import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { initWebSocket } from "./sockets/websocket";

dotenv.config(); 

const server = http.createServer(app);
const port = process.env.PORT;

initWebSocket(server);

server.listen(port, () => {
    console.log(`Server running`);
});