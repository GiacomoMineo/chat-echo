export const initSocket = (url: string) => {
  const socket = new WebSocket(url);

  const sendSocketMessage = (author: string, text: string) =>
    socket.send(JSON.stringify({ author, text }));

  return { socket, sendSocketMessage };
};
