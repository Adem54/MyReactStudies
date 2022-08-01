import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { recipeApi } from "../services/recipeApi";
export const store = configureStore({
  reducer:{
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(recipeApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch)
/*
A utility used to enable refetchOnFocus and refetchOnReconnect behaviors. It requires the dispatch method from your store. Calling setupListeners(store.dispatch) will configure listeners with the recommended defaults, but you have the option of providing a callback for more granular control.
*/