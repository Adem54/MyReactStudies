//Uygulamanin butunun bir parcasi
import {createSlice} from '@reduxjs/toolkit';
//createSlice bize bir tane slice olusturacak
//Bu slice ise stattimizin icindeki tum verilerin dureacgi key e bir isim verecegiz
//Sonra buna bir initalState verecegiz bu initalState dolu veya bos olabilir
//Sonra state i guncelleyecek olan reducer lari tanimlayacagiz
//counterSlice i burdan store a gonderip reducer icerisinde kullanacagiz...
export const counterSlice=createSlice({
    name:'counter',//counter burda soyle dusunelim, actiontypes daki typename dir...
    initialState:{
        value:0
    },
    reducers:{
        increment:(state)=>{//state sayesinde field-obje nin icindeki herhangi bir datayi degistirebiliriz..state initial icinde belirtilen degerin guncel, son halidir yani state initialState objesidir ilk basta ama daha sonra guncellenince tabi guncel hali olmus olacak
           state.value+=1; //increment bizim actionCreator functionumizdir ve useDispatch araciligi ile Counter componentinde calistirilacaktir... ve disa aktarilmasi gerekiyor
        },
        decrement:(state)=>{
            state.value-=1;
        },//Eger componentte bir input icinden girilecek bir veri var ve o verinin state guncellenirken orda olmasi gerekiyorsa zaten o veri otomatik action isminde yazabilirz ama sunu iyi bilelim ismi action olmasa da olur ancak bu bir objedir ve o obje icindeki payload propertysi icinde bulunuyor veri....
        incrementByAmount:(state,action)=>{//action icinde payload ve type property si olan bir objedir ve payload degeri ise biz bu action i calistirdigimiz yerde paremetreye ne verirsek action objesi icine o gelecektir
            console.log("action: ",action);
            //{  "type": "counter/incrementByAmount","payload": 23}
            state.value+=action.payload;
        }
    }
})


export const {increment,decrement,incrementByAmount}=counterSlice.actions;//=>Counter componentine gidip orda increment actioncreator func inin useDispatch icinde calistiracak
export default counterSlice.reducer;//Burdan store da kullanilmak uzere disari aktariliyor