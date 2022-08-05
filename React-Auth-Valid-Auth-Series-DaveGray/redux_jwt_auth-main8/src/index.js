import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { store } from './app/store'
import { Provider } from 'react-redux'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //React.StrictMode ne yapiyor, bu reload ediyor ki kez, load, unlod,reload
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
/*
<Route path="/*" element={<App />} />  path="/*" bu su demektir, App componenti altinda  nested Routes ve Route lari kullanarak
componentler Route edecegiz, o Route lar tabi "/" App path adresinin devamina yazilacak adresleri..Yani grup Routes lar i temsil ediyor
*/