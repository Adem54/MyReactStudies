
import { getDevelopers } from './api/tabApi';
import './App.css';
import Context from './components/Context';
import { TabContextProvider } from './context/TabContext';
import { useQuery } from 'react-query';
import Loading from './components/Loading';
import {ReactElement} from "react";

function App() {
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    "developers",
    getDevelopers
  );

let content:ReactElement=<></>;

if(isLoading){
  content=<Loading/>
}else if(isSuccess){
content=  <>
<h1 className="h1">Experience</h1>
<TabContextProvider>
  <Context/>
</TabContextProvider>
<button className="btn">MORE INFO</button>
</>
}

  return (
    <div className="App">
    
{content}
  
    </div>
  );
}

export default App;
