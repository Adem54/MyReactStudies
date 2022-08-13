import { useReducer } from 'react';

//Yapmayi dusundugmuz tum action lar icin birer type belirleriz.
const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  NEW_USER_INPUT: 'newUserInput',
  TG_COLOR: 'tgColor'
}

//Eger ornegin cok karmasik bir state timiz var ise o zaman useState yerine useReducer kullanabiliriz
//Yonetilmesi daha kolay ve takibi daha kolay oluyor
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.NEW_USER_INPUT:
      console.log(action.payload);//input a ne girilirse o dur burda
      return { ...state, userInput: action.payload };
    case ACTION.TG_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error();//
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0, userInput: '', color: false });

  return (
    <main className="App" style={{ color: state.color ? '#FFF' : '#FFF952' }}>
      <input
        type="text"
        value={state.userInput}
        onChange={(e) => dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value })}
      />
      <br /><br />
      <p>{state.count}</p>
      <section>
        <button onClick={(() => dispatch({ type: ACTION.DECREMENT }))}>-</button>
        <button onClick={(() => dispatch({ type: ACTION.INCREMENT }))}>+</button>
        <button onClick={(() => dispatch({ type: ACTION.TG_COLOR }))}>Color</button>
      </section>
      <br /><br />
      <p>{state.userInput}</p>
    </main>
  );
}

export default App;



