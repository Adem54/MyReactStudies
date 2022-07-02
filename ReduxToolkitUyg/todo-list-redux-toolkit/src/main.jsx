import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
//Biz react-redux baglantisini burda yapiyoruz ve react-redux ile yapiyoruz...Provider ile sarmalamamiz gerek ve icine de redux in verisini gondererek tum componentlerin store a erismesini saglariz...
import { Provider } from 'react-redux'
import {store} from "./redux/store";

ReactDOM.render(
<Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
)
