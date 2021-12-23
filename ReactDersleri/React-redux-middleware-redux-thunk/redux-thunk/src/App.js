import React, { useEffect, useState } from "react";
import "./App.css";
//import axios from "axios";
import {connect} from "react-redux";
import {getCountries} from "./actions/index"

 function App(props) {
  console.log("props ",props);
  useEffect(() => {
      props.getCountries();
  }, []);
  const {countries,message,isLoading}=props
  console.log("countries:",countries)
  return (
    <div className="App">
      <h1>React Dersleri</h1>
      <h2>Redux-thunk Middleware</h2>
      {isLoading ? <p><img style={{width:70}} src='https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif' alt="spinner"/></p> :  countries.map(country => {
        return (
          <div key={country.name.common}>
            <h3>{country.name.common}</h3>
            <h4>{country.capital}</h4>
            <p>
              <img
                src={country.flags.png}
                alt={country.name.common}
                style={{ width: "100px" }}
              />
            </p>
          </div>
        );
      } )  }
    </div>
  );
      }
      const mapStateToProps=state=>{
        return {
          countries:state.countries,
          message:state.message,
          isLoading:state.isLoading
        }
      }  
      const mapActionsToProps={getCountries}
      export default connect(mapStateToProps,mapActionsToProps)(App) 
   


      /*
      
     
      
      */