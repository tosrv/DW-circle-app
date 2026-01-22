import { Server, WebSocket } from "ws";
import http from "http";

// State

let wss: Server;

const threadRooms = new Map<number, Set<WebSocket>>();
// const userRooms = new Map<number, Set<WebSocket>>();

// Init

export function initWebSocket(server: http.Server) {
  wss = new Server({ server });

  wss.on("connection", (ws: WebSocket, req) => {
    console.log("Client connected");

    ws.on("message", (raw) => {
      const { type, payload } = JSON.parse(raw.toString());

      switch (type) {
        case "join_thread":
          joinThread(ws, payload.id);
          break;

        // case "join_user";
        // joinUser(ws, payload.id);
        // break;
      }
    });

    ws.on("close", () => {
      leaveAll(ws);
      console.log("Client disconnected");
    });
  });
}

// Join

function joinThread(ws: WebSocket, threadId: number) {
  if (!threadRooms.has(threadId)) {
    threadRooms.set(threadId, new Set());
  }
  threadRooms.get(threadId)!.add(ws);
}

// function joinUser(ws: WebSocket, userId: number) {
//   if (!userRooms.has(userId)) {
//     userRooms.set(userId, new Set());
//   }
//   userRooms.get(userId)!.add(ws);
// }

function leaveAll(ws: WebSocket) {
  threadRooms.forEach((clients) => clients.delete(ws));
  // userRooms.forEach((clients) => clients.delete(ws));
}

// // Emit

// export function emitThread(threadId: number, type: "new_reply", payload: any) {
//   const clients = threadRooms.get(threadId);
//   if (!clients) return;

//   clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify({ type, payload }));
//     }
//   });
// }

// export function emitUser(
//   userId: number,
//   type: "follow" | "notification",
//   payload: any
// ) {
//   const clients = userRooms.get(userId);
//   if (!clients) return;

//   clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify({ type, payload }));
//     }
//   });
// }

// Global
export function broadcastEvent(type: "new_thread" | "like", payload: any) {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, payload }));
    }
  });
}

export const broadcastReply = (reply: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "new_reply", payload: reply }));
    }
  });
};
