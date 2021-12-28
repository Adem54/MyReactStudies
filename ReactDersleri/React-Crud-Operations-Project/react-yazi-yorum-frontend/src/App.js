import YaziListesi from "./components/YaziListesi";
import YaziDetayi from "./components/YaziDetayi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="main_wrapper">
        <header></header>
        <div className="ui raised very padded text container segment">
          <Routes>
            <Route  path="/" element={<YaziListesi />}></Route>
            <Route  path="/posts/:id" element={<YaziDetayi/>} ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
