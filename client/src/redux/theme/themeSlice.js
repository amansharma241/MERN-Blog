import { createSlice } from "@reduxjs/toolkit";

// define initial state
const initialState={
    theme:'light'
}

const themeslice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggletheme: (state) => {state.theme = state.theme==='light'?'dark' : 'light'}
}});

export const {toggletheme} = themeslice.actions;
export default themeslice.reducer;
