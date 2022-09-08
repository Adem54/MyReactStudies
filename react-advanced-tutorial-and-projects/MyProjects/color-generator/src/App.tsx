
import './App.css';
import {useState} from "react";
import Values from 'values.js'
import SingleColor from './SingleColor';

//default olarak gelecek olan rengimiz bu
//values.js sayesinde biz bir renk veriyoruz values js bize o renge ait,tonlama(tint),shade(golgeleme)
//Verdigmz renge ait tum tonlamalari toplam da 21 adet hem light tonlamalar, hem de dark tonlamalarin hepsini
//getiriyor
/* [{rgb:[255,255,255],alpha:1,type:"tint",weight:100},
    {rgb:[255,239,237],alpha:1,type:"tint",weight:90},
] */
const defaultList=new Values("#f15025").all(10);

function App() {
  const [color,setColor]=useState<string>("");
  const [error,setError]=useState<boolean>(false);
  const [list,setList]=useState<any[]>(defaultList);

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    try {
      //Kullanici ne girerse o girdigi renk in tonlarini uretiyor otomatik olarak
      //Ve uretilen tum versiyonlari da guncelliyor
      let colors=new Values(color).all(10);
      setList(colors);
      console.log("colors: ",colors[0].hex);//bu ffffff olarak gelir en acik rengin en acik kismi olarak gelir
      console.log("colors: ",colors[0].rgbString());//rgb(255, 255, 255)
      console.log("colors: ",colors[0].hexString());//  #ffffff
    } catch (error) {
      setError(true);
      console.log(error);
    }

  }
  return (
   <>
   <section className="container">
    <h3>color generator</h3>
    <form onSubmit={handleSubmit}>
    <input
    type="text"
    value={color}
    onChange={(e)=>setColor(e.currentTarget.value)}
    placeholder="#f15025"
    className={`${error ? 'error' : null}`}
    />
    <button className="btn" type="submit">
      submit
    </button>
    </form>
   </section>
   <section className="colors">
    {list.map((color:string,index:number)=>{
      return <SingleColor  
                key={index}

      
              />
    })} 
     </section>
   </>
  );
}

export default App;
