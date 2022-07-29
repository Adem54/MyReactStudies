import './App.css';
import {Routes,BrowserRouter,Route, Navigate} from "react-router-dom";
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import Info from './pages/Info';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addContact" element={<AddEdit/>}/>
        <Route path="/editContact/:id" element={<AddEdit/>}/>
        <Route path="/info/:id" element={<Info/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
