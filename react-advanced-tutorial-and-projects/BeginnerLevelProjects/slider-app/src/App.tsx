import { useState } from "react";
import "./App.css";
import { SliderType } from "./components/slide.mode";
import Slider from "./components/Slider";
import data from "./data";

function App() {
 //React icinde sadece degisken mantiginda bir data tanimlamak istiyorsak  o zaman da yine useState ile yapabiliriz bu isi
  const [slides]=useState<SliderType[]>(data);
  return (
    <div className="App">
      <h1>/ Reviews</h1>
      <Slider slides={slides} />
    </div>
  );
}

export default App;
