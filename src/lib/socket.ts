export const socket = new WebSocket(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!.replace(/^http/, "ws")}/ws`
);

socket.onopen = () => {
    console.log("WebSocket connected");
};

socket.onerror = (error) => {
    console.error("WebSocket error", error);
};

socket.onclose = () => {
    console.log("WebSocket disconnected");
};
