//Burasi da artik store , yani state depomuzu olusturmanin altyapisini kurdugumuzu yerdir

import { createStore,applyMiddleware } from "redux";
import rootReducer from "./index";
import thunk from 'redux-thunk';

export default function configureStore(){
    return createStore(rootReducer,applyMiddleware(thunk));
}
//burda store magazamizin yani state leri tutan store un altyapisini olstururken dogal olarak state leri bize guncel halde donen reducer lari parametre olarak aliyor