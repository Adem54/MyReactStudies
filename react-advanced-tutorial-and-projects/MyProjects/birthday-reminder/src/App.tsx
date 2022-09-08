
import './App.css';
import { ReminderContextProvider } from './context/ReminderContext';
import PersonList from './PersonList';

function App() {
  return (
    <ReminderContextProvider>
    <div className="App">
      <PersonList/>
    </div>
    </ReminderContextProvider>
  );
}

export default App;
