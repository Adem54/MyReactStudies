import "./App.css";
import Pagination from "./components/Pagination";
import { UserContextProvider } from "./context/UsersContext";

function App() {
  return (
    <div className="App">
      <h1 className="h1">Pagination</h1>
      <UserContextProvider>
        <Pagination />
      </UserContextProvider>

     
    </div>
  );
}

export default App;
