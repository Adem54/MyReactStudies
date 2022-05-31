import { configureStore } from "@reduxjs/toolkit";

import todosSlice from "./todos/todosSlice";

export const store=configureStore({
    reducer:{
todos:todosSlice,
    },
})

//todoSlice bize todo stateini veriyor...initalState te belirledigmiz design nasilsa o sekilde gelecektir karsimiza..orn obje icinde items dizisi seklinde