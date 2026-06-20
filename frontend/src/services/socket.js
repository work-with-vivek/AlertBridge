const SOCKET_URL = "ws://localhost:8000/ws";

let socket = null;

export function connectSocket(onMessage) {

    socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {

        console.log("WebSocket Connected");

    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        if (onMessage) {
            onMessage(data);
        }

    };

    socket.onclose = () => {

        console.log("WebSocket Disconnected");

    };

    socket.onerror = (error) => {

        console.error(error);

    };

}

export function disconnectSocket() {

    if (socket) {

        socket.close();
        socket = null;

    }

}