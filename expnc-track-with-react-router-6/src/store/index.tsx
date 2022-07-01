import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import categoryReducer from "./reducers/categoryReducer";
import { UserState } from '../types/user';
import { CategoryState } from "../types/category";
import { RecordState } from "../types/record";
import recordReducer from "./reducers/recordReducer";

//combineReducers  parametre olarak obje aliyor burda, key olarak verilerimizin state te tutulmasni istedigmiz key lerini berliritir
//Bu key ler verileri global state icinde tutacagimiz key ler olacak, karsisinda da reducer fonksiyonlarimizi girecegiz, bu fonksiyonlar bize state leri donuyor cunku
//Buraya biz uygulamamizin globalstate tinin type ini da girmemiz gerekecek typescript ile calisirken

export interface AppState {
    user:UserState;
    categories:CategoryState;
    records:RecordState;
}
//combineReducers da biz tum state lerimizi barindiran global state i ayarliyoruz ve de onun tipini de girmemiz gerekecek
const rootReducer=combineReducers<AppState>({
    user:userReducer,
    categories:categoryReducer,
    records:recordReducer
} as any );
//const combinedReducers = combineReducers({ reducer1, reducer2 } as any);
export default rootReducer;