import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

type Message = {
  id: number;
  author: string;
  text: string;
};

type ChatState = {
  messages: Message[];
  username: string;
};

export const initialState: ChatState = {
  messages: [],
  username: "Bob",
};

let nextMessageId = 0;

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: {
      reducer: (state, action: PayloadAction<Message>) => {
        // Redux Toolkit uses Immer library to guarantee state immutability
        state.messages.push(action.payload);
      },
      prepare: (author: string, text: string) => ({
        payload: {
          id: nextMessageId++,
          author,
          text,
        },
      }),
    },
  },
});

export const { addMessage } = chatSlice.actions;

export const sendMessage = (
  author: string,
  text: string,
  sendSocketMessage: (author: string, text: string) => void
): AppThunk => (dispatch) => {
  dispatch(addMessage(author, text));
  sendSocketMessage(author, text);
};

export const selectMessages = (state: RootState) => state.chat.messages;
export const selectUsername = (state: RootState) => state.chat.username;

export default chatSlice.reducer;
