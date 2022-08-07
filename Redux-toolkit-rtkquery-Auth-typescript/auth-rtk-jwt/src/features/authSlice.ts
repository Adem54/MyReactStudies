import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AuthState{
    name:string | null;
    token:string | null;
};

const initialState:AuthState={
    name:null,
    token:null
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        //Bu action methodundan donecek olan type i yazariz action da PayloadAction<> arasina
        setUser:(state:AuthState,action:PayloadAction<{name:string,token:string}>)=>{
                localStorage.setItem("user",JSON.stringify({
                    name:action.payload.name,
                    token:action.payload.token
                }))
                state.name=action.payload.name;
                state.token=action.payload.token;
        },
        logOut:(state:AuthState)=>{
            localStorage.clear();
            //state=initialState;
            state.name=null;
            state.token=null;
        }
    }

})

//Type i ile birlikte tanimladimgiz parametreler kesinlikle paranteze alinmalidir, yoksa bu hata almamiza neden olacaktir...
export const selectAuth=((state:RootState)=>state.auth);

export const {setUser,logOut}=authSlice.actions;

export default authSlice.reducer;