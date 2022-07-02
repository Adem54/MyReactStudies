import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {store } from './redux/store';
import {Provider} from 'react-redux';//Bu react ile redux arasindaki bagi kuruyor ve props araciligi ile kendine props olarak gecilen store datasini reacta iletmek


ReactDOM.render(
<Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
)
