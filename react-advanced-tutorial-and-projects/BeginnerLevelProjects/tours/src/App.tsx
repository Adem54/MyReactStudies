import "./App.css";
import TourList from "./components/TourList";
import { TourContextProvider } from "./context/TourContext";

function App() {
  return (
    <div className="App">
      <TourContextProvider>
        <TourList />
      
      </TourContextProvider>
      
    </div>
  );
}

export default App;
