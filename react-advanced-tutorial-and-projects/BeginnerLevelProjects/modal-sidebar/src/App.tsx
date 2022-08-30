import './App.css';
import {useState} from "react";
import Modal from './Modal';
import Sidebar from './Sidebar';
function App() {
  const [isOpenModal,setIsOpenModal]=useState<boolean>(false);
  console.log("isOpenModal: ",isOpenModal);
  const values={isOpenModal,setIsOpenModal}
  return (
    <div className="App">
     <Sidebar/>
     <button className="btn"
     onClick={(e:any)=>setIsOpenModal(true)}
     
     >Show Modal</button>

     <Modal {...values}  />
    </div>
  );
}

export default App;
