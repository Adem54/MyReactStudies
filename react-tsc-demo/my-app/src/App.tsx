

import './App.css';
import Hello from './components/Hello';

function App() {
  return (
    <div className="App">     <h1>React</h1>
     <Hello name={"Adem"}  onSmthHappen={(name)=>{console.log(name)}} />
    </div>
  );
}

export default App;
/*
Propslar
Typescript ile react kullanirken ornegin,App.js den bir props gonderirsek baska bir 
componente o componentin props u parametre de alirken type ile birlikte vermemiz gerekiyor
yoksa typescript kendisi implicit olarak any type ini atyaacak, ki any type ini kullanmak
demek, aslinda typescripti kullanmamak demektir ondan dolayi...biz den bir type atamamizi
bekliyor....ve altiniz cizecektir type kullanmadigmiz yerlerde
*/