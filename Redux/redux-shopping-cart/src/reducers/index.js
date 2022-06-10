import { data } from "../data";
const INITIAL_STATE = {
  bookList: data,
  cart: [],
};
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_BOOK_TO_CART":
      state = {
        ...state,
        cart: state.cart.find((book) => book.id === action.payload.id)
          ? state.cart.map((book) =>
              book.id === action.payload.id
                ? { ...book, count: book.count + 1 }
                : book
            )
          : [...state.cart, { ...action.payload, count: 1 }],
      };
      return state;
    case "DELETE_FROM_CART":
      const newCart = state.cart.filter((book) => book.id !== action.payload);
      return { ...state, cart: newCart };
    case "INCREASE_COUNT":
      state={...state,cart:state.cart.map(book=>book.id===action.payload ? {...book,count:book.count+1} : book ) }  
      return state;
    case "DECREASE_COUNT":
        state={...state,cart:state.cart.map(book=>book.id!==action.payload ? book : book.count===1 ? book 
            : {...book,count:book.count-1} )}
      return state;
    default:
      return state;
  }
};
