import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  liste: [
    { id: 1, baslik: "Alisveris Yap", tamamlandi: false },
    { id: 2, baslik: "Fatura ode", tamamlandi: true },
    { id: 3, baslik: "Odevini yap", tamamlandi: true },
  ],
};
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_TODO :
      return { ...state, liste: [...state.liste, {id:state.liste.length+1,baslik:action.payload, tamamlandi:false} ] };
    case actionTypes.CLEAN_COMPLETED_TODOS:
       state={...state,liste:state.liste.filter(todo=>todo.tamamlandi===false)};
       return state; 
       case actionTypes.TODO_TOGGLE:
        state={...state,liste:state.liste.map(todo=>todo.id===action.payload ? {...todo, tamamlandi:!todo.tamamlandi}: todo)};
        return state;
    default:
      return state;
  }
};
