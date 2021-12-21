import * as ActionTypes from "./actionTypes";


export const addToCart=(cartItem)=> {//cartItem={product:{},quantity:1} demektir carItem
    return {
        type:ActionTypes.ADD_TO_CART,
        payload:cartItem
        }    
}

export const removeFromCart=(product)=>{
    return {
        type:ActionTypes.REMOVE_FROM_CART,
        payload:product
    }
}

