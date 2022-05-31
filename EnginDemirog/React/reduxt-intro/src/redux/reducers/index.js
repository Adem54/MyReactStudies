import { combineReducers } from "redux";
//reducer lari bir araya getir
import counterReducer from "./counterReducer";
const reducers=combineReducers({
counterReducer
})
export default reducers;