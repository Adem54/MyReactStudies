import { configureStore,combineReducers } from "@reduxjs/toolkit";
import noteSlice from "./notes/noteSlice";

const rootReducer=combineReducers({
    noteSlice,//Ekstra eklemek istedgimiz slice lari bu objeye ekleyebiliriz...
})

export const store=configureStore({
    reducer:rootReducer
})