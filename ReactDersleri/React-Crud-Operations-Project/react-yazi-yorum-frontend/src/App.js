import YaziListesi from "./components/YaziListesi";
import YaziDetayi from "./components/YaziDetayi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YaziEkle from "./components/YaziEkle";
import YaziDuzenle from "./components/YaziDuzenle";
import YorumDuzenle from "./components/YorumDuzenle";
import React from "react";
function App() {
  return (
    <Router>
   
      <div className="main_wrapper">
        <header></header>
        <div className="ui raised very padded text container segment">
          <Routes>
            <Route  path="/" element={<YaziListesi />}></Route>
            <Route  path="/posts/:id" element={<YaziDetayi/>} ></Route>
            <Route  path="/yaziekle" element={<YaziEkle/>}></Route>
            <Route  path="/posts/:id/edit" element={<YaziDuzenle/>} ></Route>
            <Route  path="/posts/:post_id/comments/:id/edit" element={<YorumDuzenle/>}></Route>

          </Routes>
        </div>
      </div>
     
    </Router>
  );
}

export default App;