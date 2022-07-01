import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import App from './App';
import reducer from './reducers';
import thunk from "redux-thunk";

const store=createStore(reducer,applyMiddleware(thunk));//thunk i parametre olarak alan applyMiddleware fonskiyonunu kullaniyoruz... 
//Redux thunku biz kullanirken yapmamiz gereken ayarlar bu kadardir
//Neden thunk kullaniyoruz..Biz actionlarda fonksiyon hazirlarken action donmemiz gerekiyor ve type i zorunlu , payload i opsiyonel olan bir action objesi dondurmemiz gerekiyor. Ancak api ye request gonderip api den data aldgimiz zaman data bize dizi olarak gelecektir, yani pure bir obje dondurmedigi icin, redux sistemi bunu algilayamiyor, middleware de bizim actioncreatorimizi bir fonksiyon daha donduredcek sekilde yapiyor. Dondurdugu fonksiyon dispatch degerini parametre olarak aliyor ve bu dispatch yardimi ile biz reducer a manuel olarak action lari gonderiyoruz...
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

