import { io, Socket } from "socket.io-client";
import { getCookie } from "~/app/actions";

class SocketService {
  private socket: Socket | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized && this.socket?.connected) {
      return this.socket;
    }

    const accessToken = await getCookie("access_token");

    if (!accessToken) {
      console.warn("No access token, cannot initialize socket");
      return null;
    }

    this.socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signaling`, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
      auth: {
        token: accessToken,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    this.isInitialized = true;
    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isInitialized = false;
    }
  }
}

// Singleton instance
export const socketService = new SocketService();
