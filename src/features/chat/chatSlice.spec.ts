import chat, {
  initialState,
  addMessage,
  sendMessage,
  selectMessages,
} from "./chatSlice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { WebSocket, Server } from "mock-socket";
import { initSocket } from "../../utilities/socket";

window.WebSocket = WebSocket;

const mockStore = configureMockStore([thunk]);

describe("chat addMessage action", () => {
  it("should create an an action to add a message", () => {
    const author = "Carl";
    const text = "Hello";
    const expectedAction = {
      type: addMessage.type,
      payload: { id: 0, author, text },
    };
    expect(addMessage(author, text)).toEqual(expectedAction);
  });

  it("should generate incrementing IDs", () => {
    const author = "Carl";
    const text = "Hello";
    const action1 = addMessage(author, text);
    const action2 = addMessage(author, text);

    expect(action1.payload).toEqual({ id: 1, author: author, text: text });
    expect(action2.payload).toEqual({ id: 2, author: author, text: text });
  });
});

describe("chat reducer", () => {
  it("should return initial state", () => {
    expect(chat(undefined, {} as any)).toEqual(initialState);
  });

  it("addMessage action should update messages state", () => {
    const data1 = {
      id: 0,
      author: "Carl",
      text: "Hello",
    };

    const nextState1 = chat(initialState, {
      type: addMessage.type,
      payload: data1,
    });

    expect(selectMessages({ chat: nextState1 })).toEqual([data1]);

    const data2 = {
      id: 1,
      author: "Carl",
    };

    const nextState2 = chat(nextState1, {
      type: addMessage.type,
      payload: data2,
    });

    expect(selectMessages({ chat: nextState2 })).toEqual([data1, data2]);
  });
});

describe("chat sendMessage", () => {
  it("should update messages state AND send a message to the socket", async () => {
    const store = mockStore(initialState);

    const mockUrl = "ws://localhost:8080";
    const mockServer = new Server(mockUrl);
    const { sendSocketMessage } = initSocket(mockUrl);
    const serverSocket = await new Promise<WebSocket>((resolve) =>
      mockServer.on("connection", (socket) => resolve(socket))
    );

    const author = "Carl";
    const text = "Hello";

    const expectedActions = [
      {
        type: addMessage.type,
        payload: { id: 3, author, text },
      },
    ];
    const expectedSocketMessage = JSON.stringify({ author, text });

    await store.dispatch(sendMessage(author, text, sendSocketMessage) as any);

    const message = await new Promise<string>((resolve) =>
      serverSocket.on("message", (data) => resolve(data as string))
    );
    expect(store.getActions()).toEqual(expectedActions);
    expect(message).toEqual(expectedSocketMessage);
  });
});
