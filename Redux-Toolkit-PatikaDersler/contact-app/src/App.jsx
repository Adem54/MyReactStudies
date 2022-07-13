import "./App.css";
import Contacts from "./components/Contacts";
import { contactSelectors } from "./redux/contactSlice";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Edit from "./components/Contacts/Edit";

function App() {
  const totalCount = useSelector(contactSelectors.selectTotal); //Bize total kayit sayisini veriyor
  return (
    <div className="App">
      <h2>Contacts({totalCount})</h2>
      <Routes>
        <Route path="/" element={<Contacts/>} />
        <Route path="edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
