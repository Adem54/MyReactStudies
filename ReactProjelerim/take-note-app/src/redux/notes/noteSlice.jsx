import { createSlice } from "@reduxjs/toolkit";

const notes={id:"", description:"", color:""}
export const noteSlice=createSlice({
name:"notes",
initialState:{
notes,
currentColor:"",
},
reducers:{
    chooseColorAction:(state,action)=>{
        state.initialState.currentColor=action.payload;

    }
}
})

export const {chooseColorAction}=noteSlice.actions;

export default noteSlice.reducer;