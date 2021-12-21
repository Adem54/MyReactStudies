import * as ActionTypes from '../actions/actionTypes';
import initialState from './initialState';


export default function productListReducer(state=initialState.products,action){
    switch (action.type) {
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            return state=action.payload;
            
        default:
            return state;
    }
}