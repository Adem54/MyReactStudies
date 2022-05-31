import * as ActionTypes from "../actions/actionTypes";
import initialState from "./initialState";
const cartReducer=(state=initialState.cart,action)=>{
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
        //Bu cok onemli...herhangi bir sepet vs gibi dizi ye veri eklerken, kurallarimiza gore ekleyecegimiz veriyi once bir cek ederiz..
         //Once burda eklemek istedigimiz urun daha onceden eklenmis mi onu cek ederiz eger varsa sadece sayisini arttiririz eger  yoksa, da hem urun ekleriz demekki ilk defa eklenecegi icinde quantity sini de 1 olarak baslatiriz   
         //cart state imiz zaten elimizde o bir dizi ona find yapip, gelen urunun id sinin sepette olup olmadigi cek edilir
         //Simdi state imiz sadece cart:[] dizisidir icerisine biz 2 elemanli objeler ekleyecegiz objenin 1 elemani product objesi, diger elemani o product in quantity sinden olusuyor ve ondan dolayi da eger urun ilk defa eklenirse quantity yi biz baslatacagiz 1 olarak
         var addedItem=state.find(c=>c.product.id===action.payload.product.id);
         //Redux ta soyle bir durum var bizim ilgili nesnenin referansini degistirmemiz gerekiyor.yani immutable,yani primary tip gibi kopya olusturmamiz gerekiyr cunku dizi,obje bunlar mutable dir ve degistirilebilir dir, biz onlari baska bir degiskene atadgimiz zaman onlar o atadgimiz verinin referansini , veya adresini atiyor yani kopyalama yapmiyor, dolayisi ile de o atadgimiz eleman veya atanan eleman icinde dizi veya obje ise icindeki herhangi bir degisiklik her ikisini de etkiliyor, ama primary type da bir degiskene primary type olan bir degisken atandigi zaman hemen bellekte yeni bir alan acip, kopyalayip ona degeri atamis oluyor ve birbiri ile alakalari kalmiyor sonrasinda, birsindeki degisiklik digereini sonradan etkilemiyor.Dolayisi ile biz referans tiplerle calisip, onlari mutable tipler ama immutable gibi kullanmamiz gerekiyor
         //BU BILGI COOK KRITIK,COOK ONEMLI--
         //Redux ta soyle bir durum var bizim ilgili nesnenin referansini degistirmemiz gerekiyor.Cunku biz array in referansini degistirmedgimiz zaman, state degismemis kabul ediliyor, ve degisiklik state e yansimiyor
         //addedItem.quantity+=1; bu sekilde yapinca biz dogrudan ayni referans adresi icinde degisiklik yapmis oluyoruz degisikligi yapiyoruz  yapmasina da bunu redux state e yansitmiyor bunun sebebi de biz referans veya adres i degistirmeden bu islemi yapiyoruz...
         //amacimiz, addItem yani eger cart icinde boyle bir product var ise dedikten sonra bu product i ve bir de quantity isim li property nin degerini 1 arttirmak ve quantity ile beraber ikisini bir obje icine alip cart dizisinde bunlar {product:{}, quantity:1} seklinde bulunmalarini saglamak yani kisacasi 1 product objesi ile bir number tipini 1 arttirdiktan sonra bir obje icinde birlestirmek
         if(addedItem){//Bu icinde product objesi ve quantity adet sayisi numarasi bulunan bir objedir
       //Burda urun daha onceden eklenmisise buraya girecek, ve biz urunlerin ve quantity nin bir objede bulundugu
           var newState=state.map(cartItem=>{
               if(cartItem.product.id===action.payload.product.id){
                //addedItem={product:{},quantity:1}
                   return {...addedItem,quantity:addedItem.quantity+1}
           //  return Object.assign({},addedItem,{quantity:addedItem.quantity+1})
                   //{product: {…}, quantity: 2}    sonucunda buna benzer bir obje olusacak ve bu objelerinde hepsinin bir dizide toplanmasi icinde alttaki return yapilir
               }
               return cartItem;//Her gezdiginde bir return yaparsaniz neyi return yapmissak onlari bir dizi icinde toplar ve yeni bir array olarak newState e atama yapar.Her bir cartItem state in esit oldugu cart dizidir ve icinde artik product ve quantity yi barindiran objelerin oldugu bir dizidir ve referansi da Object.assign sayesinde degismistir
           })
           return newState;
         }else{//eger daha onceden bu urun sepete  eklenmemise
            //Burda state i zaten koruyoruz elemanlarini kaybetmemesi icin, sonra action da bir obje ve icinde baska propertieslerde var ondan dolayi diger propertiesleri de kaybetmemek icin de bu sekilde kopya alarak yapiyoruz bu kopya alma isleminde de farkli bir referans da kopyasini ald icin redux da yapabiliyoruz..
            //Redux ta push, pop methodlarini kullanmiyoruz cunku onun la islem yaptigimzda referans degismemis oluyor
            return [...state,{...action.payload} ]
         }


         case ActionTypes.REMOVE_FROM_CART:
             //filter methodu yeni bir dizi doner...yeni bir referans demektir bu..pop ile olmaz o referans degistirmiyor
             let deletedItem=state.filter(p=>p.product.id!==action.payload.id);
             console.log("deletedItem: ", deletedItem);
             return deletedItem;

        default:
           return state;
    }
}
export default cartReducer;