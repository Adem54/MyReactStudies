import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.css";
import rootReducer from "./store";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Routes  } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")!).render(
 
 <Provider store={store}>
    <BrowserRouter>
         
            <App />
          
    </BrowserRouter>
  </Provider>
);
//React router dom dan Browser router inia saracagiz