import { createSlice, current } from "@reduxjs/toolkit";

const initalState = {
    currentUser : null,
    error:null,
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers:{
        signinStart : (state) =>{
            state.loading = true;
            state.error=null
        },
        signinSuccess : (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {signinStart,signinFailure,signinSuccess} = userSlice.actions;
export default userSlice.reducer;