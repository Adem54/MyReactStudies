import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
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
        //PREPARE KULLANMAK!
        //PREPARE ILE DISPATCH YAPACAGIMIZ ACTIONFUNCT ADD ISLMI ICNDEKKI OTOMATIK ID URETME, VE COMPLETED DEFAULT OLARAK HER SEFERINDE FALSE YAZMA ISLEMINI EGER ADD ISLMINI BIRDEN FAZLA COMPONENTTE YAPARSAK HER SEFERINDE ELLE YAZMAMAK VE KENDIMIZI TEKRAR ETMEMEK ICIN ONLARI DA TODOSLICE DA OLUSTURUP SADECE O COMPONENTE HAS OLAN TEXT KISMINI ORDAN STATE TTEN ALACAK SEKILDE PREARE I REDUCER ICINE OLUSTURUP DEFAULT VE ID OLUSTURMAYI ONUN ICINDE YAZIP GIDIP COMPONENTLERDE KULLANABILIRZI...... 
       addTodo:{
        reducer:(state,action)=>{
            state.items.push(action.payload);
        },
        prepare:({title})=>{
            return {
               payload:{
                   id:nanoid(),
                   completed:false,
                   title,
               } 
            }
        }
       },
        toggle:(state,action)=>{//Burda items dizisi icinde tikladigimz objenin completed degeri degissin diyorsak o zaman biz o degistirecegimiz toggle in id sini bilmemiz gerekir...yani buraya bu fonksiyonun kullanilacagi yerden id gelmelidir...
            const {id}=action.payload;
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

//SELECTORLER
//Biz todosSlice icerisinde olusturdugmuz state lerimize erismek icin useSelector araciligi ile componentler icerisinde const items=useSelector(state=>state.todos.items) seklinde tutuyoruz tabi todoSlice da bizim statetimizi olusturuyoruz ilk ama store da biz onu todos olarak olusturuyoruz
//yada yine initialState altinda olusturudugumuz items verisiinin yaninda activeFilter verisine de su  sekilde erisiriz componentlerde const activeFilter = useSelector((state) => state.todos.activeFilter);
//Asil ana verimiz store veya state neyse orda parametreye o ismi veridigmiz icin oyle kullaniyoruz ama sonrasinda biz verimiz onun altindaki todos objesidir bunu da store da olusturmus oluyoruz yani biz todosSlice da olusturudugmuz state lerimiz reducer da todos altinda toplamis oluyoruz aslinda ve de verileri alirken bu siralamada aliyoruz...state(veya store) (state)=>state.todos.items...veya (state)=>state.todos.activeFilter.
//PROBLEM LE NASIL BAS EDERIZ...BESTPRACTISE
//Yalniz burda soyle bir problem yasayabiliiriz ornegin biz buyuk bir prooje olusturduk ve sonra biz bu selectorumzu veriye erisme yolumuzda degisiklik yapmamiz gerekti o zaman ne yapacagiz ornegin 100 kere state=>state.todos.items i kullanmissak gidip 100 unde de degisiklik mi yapacagiz iste bundan kurtulmak icin bir yolumuz var
//Burda biz selector olusturmus olduk aslinda...ve bunu gidip componentimizde kullanabiliriz dogrdudan.
export const selectTodos=state=>state.todos.items;
//Ne yaptik burda componentslerde veriye erisme yolumuzu burda  dogrudan bir degiskene atadik ve onu disa aktardik...yani biz artik onst items=useSelector(state=>state.todos.items); seklinde yazmak yerine selectTodos yazabiliriz... const items=useSelector(selectTodos); yazarak componentlerimizde statete direk erisebiliriz....
//BESTPRACTISE..
//Biz ornegin datamizin active, completed butonlarina tikladigimzda onlara ozel state durumlari olusturmustuk yine todoSlice da ve butonlara bastigimzda state durumlarini active, completed ve all diye degistirerek verileri ekran da gorunme durumlarla butonlara tiklama durumlarimizi eslestirmstik ve bunun icinde bir filtreleme fonksiyonu  yazmistik dogrudan ve biz bu filtreleme fonksiyonunu normal bir direk yalin, vanilay javascript mantiginda biryerde global fonksiyon olarak olusturup sonra onu ihtiyacimiz olan yerlerde cagirirdik ki DRY-do not repeat yourself prensibine uyalim diye...React-redux-toolkitte buna bir cozumuzmuz var burda yazdigmniz filtreleme kodlarini gelip todoSlice da bir selector de tutup ve export edip ona da ihtiyacimiz olan comnponentlerde o fonksiyonu selector araciligi ile cagirabilecegiz
export const selectFilteredTodos=(state)=>{
    if(state.todos.activeFilter==="all"){
        return state.todos.items;
    }
    return state.todos.items.filter((todo)=>
    state.todos.activeFilter==="active" ? !todo.completed
    : todo.completed
    );
}

export const selectActiveFilter=(state)=>state.todos.activeFilter;