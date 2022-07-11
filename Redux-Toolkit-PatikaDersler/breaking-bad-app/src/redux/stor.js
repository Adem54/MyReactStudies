import { combineReducers, configureStore } from "@reduxjs/toolkit";
 import {characters} from "./charactersSlice";
 import quotes from "./quoteSlice";

const rootReducer=combineReducers({
    characters,quotes
})

export const store=configureStore({
    reducer:rootReducer
})
