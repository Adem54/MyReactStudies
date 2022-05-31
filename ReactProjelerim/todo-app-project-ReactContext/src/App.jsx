import { useState } from "react";
import "./App.css";

import Container from "./components/Container";
import { TodoListProvider } from "./context/TodoListContext";

function App() {
  const [count, setCount] = useState(0);

  return (
   
  <TodoListProvider > 
     <Container/>
     </TodoListProvider>
    
  
  );
}

export default App;
