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
        sethistoryItems: (state, action) => {
            state.items = action.payload.items;
        },
    },
});

export const { addHistoryItem, sethistoryItems } = historySlice.actions;

export default historySlice.reducer;
