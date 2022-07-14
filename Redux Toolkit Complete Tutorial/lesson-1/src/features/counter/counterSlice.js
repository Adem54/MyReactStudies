import {createSlice} from "@reduxjs/toolkit";


export const counterSlice=createSlice({
    name:"counters",
    initialState:{
        count:0
    },
    reducers:{
        increment:(state,action)=>{
            state.count+=1;
        },
        decrement:(state,action)=>{
            state.count-=1;
        },
        incrementByAmount:(state,action)=>{
            //action.payload:{number: '7'} boyle geliyor
            //input icine girilen deger text old icin text geldi
            state.count+=action.payload.number;
        },
        reset:(state,action)=>{
            state.count=0;
        }
    }
});

export default counterSlice.reducer;
export const {increment,decrement,incrementByAmount,reset}=counterSlice.actions;
export const selectCount=state=>state.counter.count;
