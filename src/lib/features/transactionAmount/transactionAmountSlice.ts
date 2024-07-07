import { createSlice } from "@reduxjs/toolkit";

export const transactionAmount = createSlice({
    name: "transactionAmount",
    initialState: [],
    reducers: {
        addAmount: (state: any, action) => {
            state.push(action.payload);
        }
    },
});

export const { addAmount } = transactionAmount.actions;

export default transactionAmount.reducer;