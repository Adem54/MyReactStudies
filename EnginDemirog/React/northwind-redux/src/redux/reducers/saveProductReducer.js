import * as ActionTypes from '../actions/actionTypes';
import initialState from './initialState';
export default function saveProductReducer(state=initialState.savedProduct,action){
    switch (action.type) {
        case ActionTypes.UPDATE_PRODUCT_SUCCESS:
            return action.payload;
        case ActionTypes.CREATE_PRODUCT_SUCCESS:
              return action.payload;
        default:
            return state;
    }
}