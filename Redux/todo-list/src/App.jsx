import React, { useState } from "react";
import "./styles.css";
import { useSelector, connect, useDispatch } from "react-redux";
import { addNewTodo, CleanCompletedTodos, todoToggle } from "../redux/actions";

const App = (props) => {
  const [input, setInput] = useState("");
  const liste = useSelector((state) => state.liste);
  
  const dispatch = useDispatch();
  //console.log("props:: ", props); //connect uzerinden eristgimiz redux taki data gelirken dispatch ile beraber geliyor....

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = (title) => {
    setInput("");
    dispatch(addNewTodo(title));
  };

  /*
    ekleme işlemi yaptığımız butonda  önce state'i güncelleyip sonra actiona yolluyoruz.  Yani text değerinin içini boşaltıp actiona göndermiş gibi oluyoruz ama nasıl boş değeri değilde dolu değeri gönderdi. Senkron çalıştığı için denk mi geldi?
    Çok güzel yakalamışsınız. State güncellemeleri Javascript'in closure mantığıyla yakından alakalıdır. Biz o callback içinde setText("") yazar yazmaz state değişse bile onClick içindeki callback fonksiyonu hala eski değere, en son render'daki değere sahip. Eğer Javascript closure konusuna hakimseniz vereceğim şu iki linke bir göz atın.
https://dmitripavlutin.com/react-hooks-stale-closures/ (özellikle madde 3.2)
https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    */
  const cleanTodos = () => {
    dispatch(CleanCompletedTodos());
  };
  const handleToggle = (id) => {
    dispatch(todoToggle(id));
  };
  return (
    <div className="App">
      <h1>Yapilacaklar Listesi</h1>
      <div className="ekleme_formu">
        <input
          placeholer="listeye ekle"
          value={input}
          onChange={handleChange}
        />
        <button onClick={() => addTodo(input)}>Ekle</button>
      </div>
      <div className="liste">
        {liste.map((item, index) => (
          <div
            key={item.id}
            className={item.tamamlandi ? "yapildi" : ""}
            onClick={() => props.todoToggle(item.id)}
          >
            {item.baslik}
          </div>
          //Bu da usedispatch kullanmadan connect uzerinden bir actionCreator methodunu nasil comonent icinde invoke ederiz onun ornegidir, actionCreator daki methodu import edip altta react-redux tan gelen methoda parametre olarak atadk ve component icinde calistirabilecegimiz metodu props icine gondermis oldu artik props uzerinden invoke edebilirz...yani o dispatchi arkada yapacak, biz invoike edince disaptch i arakda yapiyor        <div key={item.id} className={item.tamamlandi ? "yapildi" : ""}  onClick={()=>props.todoToggle(item.id)} >{item.baslik}</div>
        ))}
      </div>
      <button className="temizle" onClick={cleanTodos}>
        Tamamlananlari Temizle
      </button>
    </div>
  );
};
const mapStateToProps = (store) => {
  return {
    liste: store.liste,
  };
};

export default connect(mapStateToProps, { todoToggle })(App);
//connect methodu curried function dir

/*
1-Yeni eleman eklerken uniq id uretme islemi yaptik
  case actionTypes.ADD_NEW_TODO :
      return { ...state, liste: [...state.liste, {id:state.liste.length+1,baslik:action.payload, tamamlandi:false} ] };
    case actionTypes.CLEAN_COMPLETED_TODOS:

2-actionType larimizi daha profesyonel ele aldik
export const ADD_NEW_TODO="ADD_NEW_TODO";
export const CLEAN_COMPLETED_TODOS="CLEAN_COMPLETED_TODOS";
export const TODO_TOGGLE="TODO_TO

actionTypes lara ihtiyacimiz olan sayfalarda da onlari asaagidaki gibi import ederek kullandik
import * as actionTypes from "./actionTypes";
3-toggle isleminde css class ini boolean tamamnlandi proeprt datamiza gore bir css lass i  uygulansin veya uygulanmasin diyerek dinamik bir sekilde bir elemente css ozelligi verdik veya kaldirdik...Bu real hayatta cok fazla kullaniliyor bunu cook cook iyi ogren cok ihtiyacin olacak...
   <div className="liste">
        {liste.map((item,index) => (
          <div key={item.id} className={item.tamamlandi ? "yapildi" : ""}  onClick={()=>handleToggle(item.id)} >{item.baslik}</div>
        ))}
      </div>
  styles.css icinde soyle bir class imiz var , ve onu burda kullandik....
  .yapildi {
    text-decoration: line-through;
  }
  
  Ayrica, reducer da da bu islemi map ile yaptik...
   case actionTypes.TODO_TOGGLE:
        state={...state,liste:state.liste.map(todo=>todo.id===action.payload ? {...todo, tamamlandi:!todo.tamamlandi}: todo)};
        return state;

 4-Todo listesi icerisinden tamamlanan ve tamamlandigi icin ustu cizili olanlar tammalananlar temizlensin butonuna 
 tiklandiginda temizleniyor
   case actionTypes.CLEAN_COMPLETED_TODOS:
       state={...state,liste:state.liste.filter(todo=>todo.tamamlandi===false)};
       return state; 
        
*/
