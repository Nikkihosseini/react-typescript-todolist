import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "../features/todosSlice";
import { filterSlice } from "../features/filterSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    filter: filterSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;
