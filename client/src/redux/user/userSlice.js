import { createSlice } from "@reduxjs/toolkit";

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
        },
        signOut: (state) => {
            state.currentUser = null;
        },
        updateStart : (state) => {
            state.loading = true;
        },
        updateSuccess : (state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        updateFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart : (state,action) => {
            state.loading = true;
        },
        deleteUserSuccess : (state,action) => {
            state.loading = false;
            state.currentUser = null;
        },
        deleteUserFailure : (state,action) => {
            state.loading = false;
        }
    }
});

export const {signinStart,signinFailure,signinSuccess,signOut,updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess} = userSlice.actions;
export default userSlice.reducer;