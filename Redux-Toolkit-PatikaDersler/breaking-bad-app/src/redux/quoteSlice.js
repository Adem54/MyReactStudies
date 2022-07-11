import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../components/common/api";


export const getQuotesAsync=createAsyncThunk("quotes/getQuotesAsync", async ()=>{
    const res=await api().get("/quotes");
    console.log("quotesresponse: ", res.data);
    return res.data;
})


export const quotesSlice=createSlice({
    name:"quotes",
    initialState:{
        items:[],
        status:"idle",
        error:null
    },
    reducers:{

    },
    extraReducers:{
        [getQuotesAsync.fulfilled]:(state,action)=>{
            state.status="succeeded";
            console.log("action.payload: ",action.payload);
            state.items=action.payload;
        },
        [getQuotesAsync.pending]:(state,action)=>{
            state.status="loading";
        },
        [getQuotesAsync.rejected]:(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        },
       
    }
});

export default quotesSlice.reducer;
export const selectQuotes=state=>state.quotes.items;
export const selectStatus=state=>state.quotes.status;
export const selectError=state=>state.quotes.error;