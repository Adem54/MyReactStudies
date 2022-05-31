import React from 'react'
import {connect} from "react-redux";

  function Counter(props) {
    //Bize bu componentte sayi lazm yanmi state ten gelecek veri lazm onu da biz redux tan alacagiz o zaman bu component ile redux arasindsa bir baglanti kurmamiz gerekir
    //Biz reduxt ile baglantiyi react-reduxt tan gelen connect nesnesi ile saglariz..
    return (
        <div>
            <h1>{props.counter} </h1>{
               // proplarin oldugu bir obje doneriz,reducer daki state bilgisi gelir, hangi reducer dan gelir counterReducer dan gelir,state bilgisini counterReducer dan cek demis oluyoruz...
            }
        </div>
    )
}
// state i counterin props larina bagla
const mapStateToProps=(state)=>{
    return {counter:state.counterReducer}//proplarin oldugu bir obje doneriz,reducer daki state bilgisi gelir, hangi reducer dan gelir counterReducer dan gelir,state bilgisini counterReducer dan cek demis oluyoruz...
    //Dikkat ettik mi store u configureStore da olustururken reducer lar paramtre oolarak aliyor, state i donduren reducar lar..ve dolayisi ile burda mapStateToProps fonksiyonumuzda parametre olarak gelen state de icerisinde state leri donduren reducer larimiz var bize hangi reducer yani hangi state lazm ise o reducer dan alacagiz o veriyi
    //Bizim uygulamamizda zaten tanimli reducer lar var, biz src klasorumuz icinde index.js de bu islemleri yapmistik, orda store umuz create ettik ve App.js imizi Provide ile sarmalayarak redux i react componentlerine sarmalayarak baglamis olduk reducer lari baglams olduk.. bizim bagli oldugumuz bir reducer toplulugu var iste onlar icinde de counterReducer old icin biz burda countreReducer dan donen state degerine erisebiliyoruz
}
//Ve bu islemden sonra artik Counter componentimizin propslarinda bir counter degeri var o da degerini reducer yani counterReducer dan aliyor...Biz daha onceden state bilgisini App den aliyorduk...simdi ise direk global biryerden yani redux taki store umuzdan aliyoruz
export default connect (mapStateToProps)(Counter);