import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import menuFoodReducer from "../features/menu/menuSlice";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import {menuApi} from "../services/menuApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu:menuFoodReducer,
    [menuApi.reducerPath]:menuApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(menuApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
