import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Quotes from "./components/pages/Quotes"

import CharacterDetails from './components/pages/CharacterDetails';
import Layout from './components/Layout';
import QuotesDetails from './components/pages/QuoteDetails.js';


function App() {
  return (
    <div className="App">
       <Layout/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="char/:char_id" element={<CharacterDetails/>}/>
        <Route path="quotes" element={<Quotes />}/>
        <Route path="quotes/:quote_id" element={<QuotesDetails/>}/>
      </Routes>   
    </div>
  );
}

export default App;
