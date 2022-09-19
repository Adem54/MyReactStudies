import './App.css'
import {getAllInfo,getUser,getAllData,getAllDataWithAxios} from "./service/index";
import {useEffect,useState} from "react";
function App() {
  const [data, setData] = useState([])
const [response,setResponse]=useState([]);
const [myData,setMyData]=useState([]);
const getData=async()=>{
  const res=await getAllData();
   setResponse(res);
}

  console.log("dataaaaaaaaaaa: ",data);
  console.log("Response: ",response);
  console.log("myDataaa: ",myData);
  useEffect(()=>{
    getAllInfo().then(res=>setData(res))
    getUser().then(res=>console.log("ress:",res))
    getData();
    getAllDataWithAxios().then(res=>setMyData(res));
  },[])

  return (
    <div className="App">
    <h2>React</h2>
    </div>
  )
}

export default App
