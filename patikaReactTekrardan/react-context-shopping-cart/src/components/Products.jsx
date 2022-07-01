import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {BookContext} from "../App";
const Products = props => {
    const context=useContext(BookContext);
    console.log("context: ",context);
 
  return (
    <div>
      <h2>
        <span>Kitap Listesi</span>
        <Link to="/cart">Sepetim</Link>
      </h2>
     {context.state.books.map((book,index)=>(
         <div key={book.id} className="book">
         <img
           src={book.image}
           alt="Simyaci"
         />
         <div>
           <h4>{book.name}</h4>
           <p>Yazar: {book.author}</p>
           <p>Fiyat: &#8378; {book.price}</p>
           <button onClick={()=>context.addToCart(book)}>Sepete Ekle</button>
         </div>
       </div>
     ))}
    </div>
  );
};

export default Products;
/*
Bizim burda bir kitap listemiz var ve bir dizi olarak geliyor bize ayrica bizim birde sepetimiz var
 yani sepete atilan kitaplari icinde tutacagimiz sepetimiz var yani bizim bir de sepet listemiz olacak,
  yani dizimiz olacak sepet dizimiz olacak....Burda context icinde tutmayi dusunecgimz datalar diger 
  componentlerin erismesini istedigmiz datalar olmalidir yoksa diger componentlerin erismesine gerek
   olmayan, yalnizca bir component icinde kullanilacak datalar i o component icinde state te tutabiliriz....
SUNU IYI BILELIM BIZE BACEND DEN BIR DATA KAYNAGI GELIR AMA BIZIM FRONT-END E AIT SADECE ON YUZDE YAPACAGIMIZ 
VE YAPMAMIZ GEREKN ISLEVLER ICINDE BIZE BACKENDDEN GELEN DATA ICINDE OLMAYAN DATALAR OLUSTURMAMIZ GEREKECEK,
 HATTA BACK-END DEN GELEN DATA DIZISI ICINDE KI OBJELERDE PROPERTY OLARAK YENI PROPERTY EKLEYEREK KULLANMAMIZ
  GEREKEN YENI DATALAR OLACAK ISTE BURDA UYANIK OLALIM, YANI BIZE HERSEY HAZIR GELECEK BIZ, MAPLICEZ, REDUCE,
   FILTER VS BUNLARLA TAKILACAGIZ YOK BU SEKILDE DEGIL, DATALARI MODELLENME TASARIMINI DA COK DOGRU BIRSEKILDE
    YAPABILMEMIZ GEREKIYOR KI COOOK COOK ONEMMLIDIR KRITIK ONEME SAHIPTIR DATANIN STATE, 
    VEYA MODEL TASARIMINI YAPABILMEK....

React-context te data larimizi tutacagimiz state leri planlamak, ki tamamini bir obje icinde de tutabiliriz
 ayri da tutabiliriz...
Burda en ust seviye de componentimz App oldugu icin onun icinde biz context i olusturduk ama tamamen 
contexti ayri biryerde de tutabilirdik
Ama soyle dusunelim redux ta store da ana datayi nasil tutuyorsak burda da biz datalari state icinde 
olusturacagiz initial datalari ve de api den gelen datayi ornegin books isminde bir state e koyacagiz, 
cart isminde bir dizi icin ayri bir state olusturracagiz, gibi bunlari bu sekilde olsturacagiz ve 
contextin icine props olarak gececgimiz datanin icine bunlari atacagiz ki diger componentlerimiz de 
erisebilsin....Ana mantigimiz bu sekilde olacak...
Yani mantik olarak MVC de model icinde tasarimin yaptigimiz datalarin, baslangic degerlerinin, 
state lerini olusturup onlari ContextProvider imize props olarak gondermemiz gerekiyor plan ve mantik olarak boyle gitmeliyiz...
Ayrica sunu da dusunelim ve anlayalim, biz Context i tuttugmuz yerde state uzerinden datalari gonderirken ,
 duruma gore setState leri de gondererek dogrudan hangi compnentte data guncellenecek ise, orda setState
  islemi yapilabilmesi icin setState leri de gondeririz....Bu cok onemlidir....Yani mantik olarak sunu
   yapmaliyiz duruma gore biz componentler icinde kullanacagimiz methodlari da Contex imizi tuttugmu
    yerde olusturup sonra o methodlari da componentlere gonderip orda calistirilmasini saglamamiz
     gerekebilir ondan dolayi direk ezbere sadece salt data yi contex ten componentlere gonderiyoruz 
     gibi ezber yapmayalim biz, setState ve methodlari da contex te olusturup ordan kullanilacak 
     componentlere gondererek dogrudan componentlerde invoke edilmesini saglayabilirz ki bu kimi zaman cok effektif olabiliyor...
*/