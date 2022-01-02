import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from "uuid";
/** 
todoSlice eski redux sisteminde olusturdugumz actions ve reducers dosyalari icerisinde 
olusturdugum herseyi tek bir yerde toplamis olacagiz.Bu bize redux-toolkitin getirmis 
oldugu en onemli ozelliklerden bir tanesidir
*/
//Birde type larimizi olusturacagiz, ki bunlari da baska bir dosya da olusturp ordan import edip kullanabiliriz ama biz burda olusturacagiz simdilik
//-- todolarimizz objeler halinde bir dizi icinde bulunacak ve biz bu tipleri onceden belirtmeliyiz
export interface Todo {
    id:string;
    title:string;
    completed:boolean;
}
const initialState:Todo[]=[];//initalState todo lardan olusan bir dizi oldugunu soyleyebiliriz

//--todoSlice i yaptik ve add methodunu olusturduk bunu export edip olusturdugmuz store klasoru icerisindeki store icerisine kaydedecegiz
const todoSlice=createSlice({
    name:"todos",
    initialState,
    reducers:{
        add:(state,action:PayloadAction<string>)=>{
            const newTodo={id:v4(),title:action.payload,completed:false};
            state.push(newTodo);//Bu sekilde state e kaydedebiliyoruz redux-toolkitte ama burda state bizden todo dizisi bekliyor ve action uzerinden bilesenimiz uzerinden burya bir todo gonderilecek ve de todo eklerken bizim sadece title a ihtiyacimiz var, id yi biz kendimiz ekleyecegiz ve completed her zaman false olacak eklenirken.Dolayisi ile action.payload dan biz sadece bir string title bekliyoruz ancak su anda payload any olarak gozukuyor onun da type ini girmeliyiz.
            //id yi olusturmak icin bir pakete ihtiyacimiz var npm i uuid paketini kurariz, uuid guvenlis string randomize id ler olusturmak icin bir pakettir
            //id:uuid.v4() random string bir id olusturur bize
        },
        //state i silmek icin id sine ihtiyacimiz olacak ve o da string tipinde
        remove:(state,action:PayloadAction<string>)=>{
            return state.filter(todo=>todo.id!==action.payload);
        },
        toggleCompleted:(state,action:PayloadAction<string>)=>{//Burada da bir completed i true ise false, false ise true yapacagiz bunu id alarak yapaagiz actoin dan, ondan dolayi da id type string old icin string oldu
            return state.map(todo=>todo.id===action.payload? {...todo,completed:!todo.completed}:todo);  
        }
    }
})
//name:global state icinde bu slicein tutacagi isimdir
//initialState e ihtiyacimiz var, state imiz neyde olusuyor ise
//Birde reducers var , ve reducers icerisinde birlestirme olayi gerceklesiyor, 
//burda actioncreator fonksiyonlari istedigimiz isimde buraya giriyoruz
//actionCreator fonks value olarak da normal redux reducer da girdgimizin nerdeyse aynisini giriyoruz 
//ama iste burda artik state i immutable, adres degistirme,referans degistirme zorunlulugumuz yok,
// state i mutate edebiliyoruz, yani push ile ornegin bir ekleme islemi yapabiliyoruz artik,
// bir paket sayesinde arka planda redux-toolkite state in degistgini  haber veriyor

export default todoSlice.reducer;
//--todoSlice i direk export etmiyoruz, reducer i default olarak export ediyoruz
//Birde actionCreator lari da export etmemiz gerekecek onu da componentlerde kullanabilmek icin
export const {add,remove,toggleCompleted}=todoSlice.actions;
//-- todoSlice.actions reducers icerisinde olusturdugumz fonksiyonlarinin isimlerini bize bir obje icerisinde veriyor ve burda add methoudnu destructor edip export ediyoruz dolayisi ile artik 
//bir component icerisinde add i import etmeye calistigimizda import edebilecegiz ayni sekilde remove action fonksiyonun ekleyince de onu da export edecegiz destruct ederekki componentler import edip kullanabilsin

//export islemlerini de bitirdikten sonra artik store klasoru icindeki index.ts ye gidip store icerisinde reducer icine burdan export ettigimiz todoSlice i girelim