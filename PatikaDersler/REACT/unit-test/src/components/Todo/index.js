import React, { useState } from 'react';

const defaultItems=[{name:"ItemA"},{name:"ItemB"},{name:"ItemC"}];
const Todo = () => {
    const [text,setText]=useState("");
    console.log("text; ",text);
    const [items,setItems]=useState(defaultItems);
    console.log("items: ",items);

    const handleClick=(e)=>{
        setItems([...items,{name:text}])
        setText("");
    }
  return <div>
    <label>
    Text
    <input  value={text} onChange={(e)=>setText(e.target.value)} />
    </label>
      <button  onClick={handleClick} >    Add</button>
      <br/>
      <br/>
      {items.map(({name},index)=>(
          <div key={index}> {name} </div>
      ))}
  </div>;
};

export default Todo;

//onClick={e=>setItems([...items,text])} = onClick={e=>setItems(prevState=>[...prevState,text])} 
//input value yi useState olan text e baglamayi unutma!
//input a value olarak eger text i vermezsek  o zaman da ornegin, biz input.value yi temizlemek istedgimiz zaman orasi temizleyemeyiz cunku biz setText("") ile sifirlamamiza ragmen value yi biz text e baglamadigmiz icin text evet sifirlanir ama bunu input valueye yansitamaz....

//Biz bu Todo listesinin testlerini yapacagiz.Biz input a bir ifade yazdgimiz zaman o yazilan ifade butona basildiginda gercekten listeye ekleniyor mu eklenmiyor mu diye bunun unittestlerini yazacagz-Todo.test.js