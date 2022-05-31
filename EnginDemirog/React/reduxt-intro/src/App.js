
import './App.css';
import Counter from "./components/Counter";
import IncreaseCounter from "./components/IncreaseCounter";
import IncreaseByTwoCounter from './components/IncreaseByTwoCounter';
import DecreaseCounter from './components/DecreaseCounter';


function App() {
  return (
    <div>
      <Counter/>
      <IncreaseCounter/>
      <DecreaseCounter/>
      <IncreaseByTwoCounter/>
    </div>
  );
}

export default App;
