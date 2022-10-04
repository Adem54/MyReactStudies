import './App.css'
import { FaBeer,FaBookmark } from 'react-icons/fa';
import { AiFillAppstore } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { FiDatabase } from "react-icons/fi";
import Context from './components/Context';
import MyButton from './components/MyButton';
import InheritedButton from './components/InheritedButton';
import InheritedButtonExample from './components/InheritedButtonExample';
import Testing from './components/Testing';


function App() {

  return (
    <div className="App">
    <h2>React</h2>
    <FaBeer/>
    <AiFillAppstore/>
    <BsFillArrowLeftCircleFill/>
    <BiBell/>
    <FiDatabase/>
    <FaBookmark/>

    <Context/>
    <MyButton/>
    <InheritedButton/>
    <InheritedButtonExample/>
    <Testing/>
    </div>
  )
}

export default App
