import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
