
import {data} from "../data";
const INITIAL_STATE={
    bookList:data,
    cart:[]
}
//reducer icine action objesi action
export const reducer=(state=INITIAL_STATE,action)=>{
    console.log("reducer a giriyor mu bakalim")
    switch (action.type) {
        case "ADD_TO_CART":
        console.log("action.payload: ",action.payload)
            return {...state,cart:[...state.cart,action.payload]}
         
            default:
                return state;
    }
}