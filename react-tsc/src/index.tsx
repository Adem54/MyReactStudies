import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Kisacasi olan budur burdas....App i render et gtit onu index.html deki
// root elemanina yazdir bu kadar
//react te gerceklesen olay budur..App i render et dom da ve git bunu root id li 
//elemente yazdir...
// import {render} from "react-dom";
// import App from "./App";

// const root=ReactDOM.createRoot(document.querySelector("#root"));
// render(<App/>,root);
//App componentini render ediyor yani arka da dom da html e cevirp ve bunu da dom daki 
//root id sine yazdiriyor....