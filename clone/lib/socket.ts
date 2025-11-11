import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io("http://61.73.36.38:8080", {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
}
