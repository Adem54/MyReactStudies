import React, { useEffect } from "react";
import "./styles.css";
import {useSelector,useDispatch} from "react-redux";
import { getCountries } from "./actions";

export default function App() {
  const countries=useSelector(store=>store.countries);
  const isLoading=useSelector(store=>store.isLoading);
  const dispatch=useDispatch();
  console.log("data: ",isLoading);
 
      useEffect(()=>{
        dispatch(getCountries());
      },[])

  return (
    <div className="App">
      <h1>React Dersleri</h1>
      <h2>React Router</h2>
      {isLoading ? (<p>Loading...</p>):(countries.map(country => {
        return (
          <div key={country.name.common}>
            <h3>{country.name.common}</h3>
            <h4>{country.capital}</h4>
            <p>
              <img
                src={country.flags.png}
                alt={country.name}
                style={{ width: "100px" }}
              />
            </p>
          </div>
        );
      }))}
    </div>
  );
}
