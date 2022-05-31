import { createSlice } from "@reduxjs/toolkit";

export const todosSlice=createSlice({
    //name-typename i temsil ediyor
    name:"todos",
    //initialState
    initialState:{
        items:[],
        activeFilter:"all",//Burda footer alanindaki all,active,completed butonundan aktif olan hangisi ise o secili olmasini istiyoruz ve burayi default olarak all diye baslatiriz...VE de yazacagimiz bir actioncreator fonksiyon ile de hangisine tiklanmis ise bizim verimiz icinde durum o an icin ne ise onu aktif hale getirmeliyiz
    },
    //Burasi bizim actionCreator larimizi yazacagimiz yer ve component icinde dispatch edecegimz yerdir burasi
    reducers:{//Burasi reducer, ondan dolayi parametreye state,action aliyor.
        //action bir objedir icinde payload veri ve type vardir...yani name..
        //action icinde payload ve type property si olan bir objedir ve payload degeri ise biz bu action i calistirdigimiz yerde paremetreye ne verirsek action objesi icine o gelecektir
        addTodo:(state,action)=>{//state initial icinde belirtilen degerin guncel, son halidir yani state initialState objesidir ilk basta ama daha sonra guncellenince tabi guncel hali olmus olacak
      
            state.items.push(action.payload);
          
        },
        toggle:(state,action)=>{//Burda items dizisi icinde tikladigimz objenin completed degeri degissin diyorsak o zaman biz o degistirecegimiz toggle in id sini bilmemiz gerekir...yani buraya bu fonksiyonun kullanilacagi yerden id gelmelidir...
            const id=action.payload;
            const item=state.items.find(item=>item.id===id);

             item.completed=!item.completed;
        },
        removeTodo:(state,action)=>{
            const id=action.payload;
        state.items=state.items.filter(todo=>todo.id!==id);
        
        },
        changeActiveFilter:(state,action)=>{
            state.activeFilter=action.payload;//dikkat edelim activeFilter degerini biz componentteki parametreden alacagiz,action.payload demek bize parametreden gelecek degerdir...Ordan ne gelirse burdaki veri o sekilde degismis olacak....ve de biz de componentte veriyi bastgimiz icin ekran surekli dinamik olacak....
        }
    }
   
})

//addTodo action func i buraya biz bu func i nerde kullanirsak ordan geliyor ve de biz o function a parametre olarak degisecek olan veri olarak ne verirsek buraya o gelecektir....

//addTodo bir actionfunction dir ve parametre de state ve action var
export const {addTodo,toggle,removeTodo,changeActiveFilter}=todosSlice.actions;
//Ekleme islemini hangi komponentte tetikileyeceksek oraya gondeririz...
//addTodo actionfonks u calistirilacagi yerde useDispatch araciigi ile ona paremetre olacak sekilde calistirilir

//Cok onemli bilmemiz gereken bir farki soyleyelim--Redux toolkit arka planda kendi icindeki bir kutphanden dolayi mutalble olarak da calisabiliyor ondan dolayi bizim data uzerinde degisiklik yaptiktan sonra illa ki de o datanin referansini degistirme veya adresini degistirmeye ugrasmamize gerek yok...burda ki bu normal redux mantigind da gecerli degildir....
export default todosSlice.reducer;//store.js e gidecek ve reducer field inda kullanilacak...Gonderdgiimiz todosSlice bizim guncellenen statimizdir aslinda...
