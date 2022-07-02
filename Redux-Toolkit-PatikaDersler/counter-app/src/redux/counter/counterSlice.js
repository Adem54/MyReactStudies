
import { createSlice} from "@reduxjs/toolkit";

export const counterSlice=createSlice({
    name:"counter",
    //state e ulasmak istedginiz zaman, state.counter dedigimz zaman gidecegiz ifadedir
    //const counter=useSelector(state=>state.counterReducer.counter); 
    initialState:{
        value:0
    },
    reducers: {
        increaseCount:(state,action)=>{
             state.value+=1;
        },
        decreaseCount:(state,action)=>{
            state.value-=1;
        },
        increaseByAmount:(state,action)=>{
            state.value+=action.payload;
        }
    }

})

export const counterReducer=counterSlice.reducer;
export const {increaseCount,decreaseCount,increaseByAmount}=counterSlice.actions;


/*
1-icinde 1 tane name bulunur bu reducer in ismini tutuyor,aslinda reducer type gibi birsey tam karsilamasada
state e ulasmak istedginiz zaman, state.counter dedigimz zaman gidecegiz ifadedir
useSelector ile compøonent icinde state e ulasmak istegimiz zaman, 
const counter=useSelector(state=>state.counterReducer.counter); seklinde ulasacaigmiz yerdir
burda counterReducer bizim reducerlarmzi topladigmiz yer olan store.js icinde counter redueri tuttgumz key, ismidir
veya proerpty ismidir
2-initalstate burda redux icinde yaptimgiz initial state ile ayni sey
3-reducer larimiz bulunacak, reducer lar icinde action fonksiyonlari bulunuyor parametre olarak state ve action objesi
alan
4-Normal redux ile ayni mantikta burasini bir reducer gibi dusunelim burdan reducer i disari aktarip, store yani tum
reducerlarimzi biraraya toplayacagimz dosyaya gonderirir-export const loginReducer = LoginSlice.reducer;
5-Burda reducer icindeki action fonksiyonlarimiz, parametre olarak state,action objesi alan action fonksiyonlarimzi 
da disa aktarip hangi componentte kullanacak isek oraya import ederek normal reduxt ta yaptimigz ayni seyi yaparak
dispatch() icinde invoke ederiz ve fonsiyonlari componentlerde dipsatch icinde invoke ederken gonderdigmiz parametre
slice icindeki fonksihyonun paramtresindeki action objesi icindeki payload propertiesine karsilik gelir...
export const { loginAction, logoutAction } = LoginSlice.actions;bu sekilde export ederiz fonksiyonlari
Bir veriyi manipule etmek icin, slice larimiz icindeki reducer lara tum fonksiyonlarimizi yazabiliriz
Bunlar bizim, bir nevi, action functionlarimizdir parametre olarak da state ve action objesi aliyorlar
Ve de bu fonksiyonlar icinde dogrudan obje icinde degisecek olan alani degistiriyoruz sadece
*/