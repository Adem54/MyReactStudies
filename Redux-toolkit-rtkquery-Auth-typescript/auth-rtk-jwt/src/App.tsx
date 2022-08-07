import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { setUser } from "./features/authSlice";
import PrivateRoute from "./components/PrivateRoute";
//ToastContainer i burda kullanarak uygulama icerisinde kullanilmasini saglamis oluyoruz aslina..
function App() {
  //This component is the highest level component in our application, because of this as soon as this component mount , we have to check
  // there is a token in our localStorage, if we do not have a any token in localStorage, so  we can create empty array but don't forge, as string in localStoragte
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  });
  //BESTPRACTISE..We have to think, if our user data in localStorage to be deleted, what is our, preparation for this...???
  //We have to think bad scenirio every time and make an application that is the ready
  //In programming, we have to think every time the worst scenario, and we have to make a app which is ready, most of the unexpected userbehaviours...
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          {/*Ana sayfaya giden kullaniciyi Auth a yonlendiriyor direk.. */}
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
