
import './App.css';
import {useState,useEffect} from "react";
import Counter from './components/Counter';
function App() {
  const[isVisible,setIsVisible]=useState("true");
 
  const[name,setName]=useState("");
 
 
  useEffect(()=>{
    console.log(`Name guncellendi`);
  },[name])

 
  return (
    <div className="App">
   
     {isVisible && <Counter/> } 
     <br/>
     <button onClick={()=>setIsVisible(false)} >RemoveCounter</button>
      <br/>
    
      <hr/>
      <h2>{name}</h2>
      <br/>
      <button onClick={()=>setName("Adem")}>ChangeName</button>

    </div>
  );
}

export default App;
/*
1-useEffect ile uygulamanin ilk acilma anini kontrol edebiliyoruz..Yani uygulamamiz ilk geldgiinde ornegin default value veya api den gelen datalarin direk listelenmesi icin ornegin hep onu kullanacagiz..O zaman useEffectgin sonundaki dizi bos birakilir
 useEffect(()=>{
    console.log("Sayi arttirildi");=>ComponentDidMount-yani componentin ilk baslama anini kontrol etmek
  },[])  //Bu arrayin adi dependency array dir....

2-Veya belli state ler her degistiginde haberdar olmak isteyebiliriz ornegin baska sayfalardan bir sayfaya gelmesini bekledigmiz ve o data geldginde o datanin degisip degiskmedingi cek ederek ona gore bir islem yapmak isteyebiliriz ki bu cok sk olan birseydir...Ve biz belli state ler her degistiginde otomatik olarak belli islemler yapilsin isteriz...Mesela formumuzu hem add, hem de edit icin kullaniriz ama add sayfasindan mi edit sayfasindan mi geliyor bunu anlamk icin iste useeffect i kullanarak ornegin bizim stateimizin ne oldugunu ne zaman degistigini vs kontrol altina almamiz gerekir iste bunun icin harika bir islevi vardir useEffectin....Bu islem icin useEffect sonunda ki dizi icine kontrol etmek istedgimiz state i yazariz...
 const[number,setNumber]=useState(0);
  useEffect(()=>{
    console.log("Sayi arttirildi");=>ComponentUpdate- number state i her degistignde bu arrow function tetiklenecketir
  },[number])


3-Birde bir componetn ortadan kaldirildiginda  da bir event tetiklenir ki bu da onemlidir ozellikle de setTimeOut veaya setInterval gibi ancak icinde bulundugjmuz tarayici kapaninca ortadan kaldirilan yapidadir o yapilar ve biz o yapilarin bulundugu componentlerii ortadan kaldirask bile o yapilar tarayiciyi mesgul etmeye devam edeceklerdir...ki onlari ortadan kaldirmakkkk cook onemlidir iste bu durumlarda da setIntervali ortadan kaldiracak fonksyonlari yine useEffect icinde invoke edebiliriz.

useEffect(() => {
    This gets called after every render, by default
    (the first one, and every one after that)
    console.log('render!');
    If you want to implement componentWillUnmount,
    return a function from here, and React will call
    it prior to unmounting.
    return () => console.log('unmounting...');
  })



4-Ayrica useEffect ile o dizi kaldirip kullanmaz isek eger herhangi bir render isleminde orasi tetiklenecektir o zamn. Ilk gelirken de tetikleniyor bunun sebebi biz state e initial bir deger atamasi yapioruz o zaman, o deger atandigi icin useEffect tetikleniyor.....
 useEffect(()=>{
    console.log("Sayi arttirildi");=>Bu ifade ile component uzerinde guncellenen hersey de burasi tetiklenecek yani biz herhangi birsey guncellenmis mi guncellenmemis mi burdan anlayabiliriz....
  })

  5-Ayrica biz bir component icinde birden cok kez useEffect kullanabilirz...Ornegin 3 ayri state i kontrol etmek icn 3 ayri useEffect kullanabiliriz...

  DIKKKAT---
  1-useEffect gibi, useState gibi hook lari kullanirken bunlar hicbir zaman bir if yapisini icinde olmamalidir
2-Comnponentin tepesinde bulunmalidir
3-VE herhangi bir kontrole tabi olmamalidir(if kontrolu gibi) yaparsak direk hata alirizzz..



Not Quite Lifecycles
useEffect runs after every render (by default), and can optionally clean up for itself before it runs again.
Rather than thinking of useEffect as one function doing the job of 3 separate lifecycles, it might be more helpful to think of it simply as a way to run side effects after render – including the potential cleanup you’d want to do before each one, and before unmounting.

Prevent useEffect From Running Every Render
If you want your effects to run less often, you can provide a second argument – an array of values. Think of them as the dependencies for that effect. If one of the dependencies has changed since the last time, the effect will run again. (It will also still run after the initial render)

useEffect Does Not Actively “Watch”
Some frameworks are reactive, meaning they automatically detect changes and update the UI when changes occur.

React does not do this – it will only re-render in response to state changes.

useEffect, too, does not actively “watch” for changes. When you call useEffect in your component, this is effectively queuing or scheduling an effect to maybe run, after the render is done.

After rendering finishes, useEffect will check the list of dependency values against the values from the last render, and will call your effect function if any one of them has changed.

Run useEffect on State Change
By default, useEffect runs after every render, but it’s also perfect for running some code in response to a state change. You can limit when the effect runs by passing the second argument to useEffect.

Think of the second argument as an array of “dependencies” – variables that, if changed, the effect should rerun. These can be any kind of variable: props, state, or anything else.
function ThreeCounts() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    console.log("count2 changed!");
  }, [count2]);

Run useEffect When a Prop Changes
Just as we were able to set up useEffect to run when a state variable changed, the same can be done with props. Remember they’re all regular variables! useEffect can trigger on any of them.

In this example, the PropChangeWatch component is receiving 2 props (a and b), and its effect will only run when the value of a changes (because we’re passing an array containing [a] as the second argument).
function PropChangeWatch({ a, b }) {
  useEffect(() => {
    console.log("value of 'a' changed to", a);
  }, [a]);
*/ 