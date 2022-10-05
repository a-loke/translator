import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
    name: "history",
    initialState: {
        items: [],
    },
    reducers: {
        addHistoryItem: (state, action) => {
            const { item } = action.payload;
            if (item) {
                state.items.unshift(item);
            }
        },
    },
});

export const { addHistoryItem } = historySlice.actions;

export default historySlice.reducer;
