import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Todo App Feature Tracking => Search & Filter

// Types
type FilterType = "All" | "Active" | "Completed";

const initialState: FilterType = "All" as FilterType;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (_state, action: PayloadAction<FilterType>) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
