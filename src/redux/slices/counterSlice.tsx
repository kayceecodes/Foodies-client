import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

const counterSlice = createSlice({
    name: "counter value",
    initialState,
    reducers: {
        addOne: (state) => {
            state.value = state.value + 1
        },
        substractOne: (state) => {
            state.value = state.value - 1
        }
    }
})

export const { addOne, substractOne } = counterSlice.actions;

export default counterSlice.reducer;