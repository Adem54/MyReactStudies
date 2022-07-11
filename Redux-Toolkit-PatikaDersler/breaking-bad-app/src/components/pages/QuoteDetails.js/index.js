import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { api } from "../../common/api";
import { useSelector } from "react-redux";
import { selectQuotes } from "../../../redux/quoteSlice";

const QuotesDetails = () => {
  const [quote, setQuote] = useState([]);
  console.log("quote:", quote);
  const { quote_id } = useParams();
  console.log("quote_id: ", typeof quote_id);
  //DIKKAT EDELIM,QUOTE_ID USEPARAMS UZERINDEN STRING OLARAK GELIYOR
  const quotes = useSelector(selectQuotes);
  const index = quotes.findIndex((x) => x.quote_id === Number(quote_id));
  console.log("index: ", index);
  const quoteDetail = quotes[index];
  console.log("quoteDetail: ", quoteDetail);
 
  //BURAYA DA BIR DIKKAT-USEEFFECT ICINDE ASENKRON ISLEMLERI
  //ASYCN-AWAITTEN ZIYADE, THEN ILE PROMISE ILE YAPALIM....
  //EGER KULLANICI LINK ILE GELIRSE HIC BOSU BOSUNA 
  //QUOTES DETAIL I API DEN CEKME, CUNKU ZATEN QUOTES DATASI
  //QUOTES COMPONENTINDE VAR ORDA TOPLAM DATAYI AL, HANGI ID ILE SAYFAYA
  //GELINDIGINI DE USEPARAMS DAN BULUYORUZ O ZAAMN LINK ILE GELINDIGINDE
  //BIZ HANGI QUOTE DETAIL DATASINA AIT ONU BULABILIRIZ..
  //YOK COMPONENTE URL DEN GELINIR VEYA SAYFA DETAIL DE IKEN SAYFA YENILENIR ISE
  //O ZAMAN DA GETDETAILS ENDPOINTINE REQUEST GONDER VE DOGRUDAN DATAYI APIDEN AL
  //BURDA ESPIRI, LINK UZERINDEN BU COMPONENTE GELIYORSA KULLANICI ZATEN ELIMZDE
  //QUOTES DATASI VAR VE DE HANGI ID LI DATA ALINACAK ONU DA BILIYORUZ O ZAMAN
  //BOSUNA API DEN DATAYI CEKMEYE GEREK YOK LINK ILE BU SAYFAYA GELDIGIMIZDE
  //BU ARADA AYRICA SOYLE BIR COZUM DE URETEBILIRZ, BIZ COMPONENT IN MOUNT EDILDIGINDE
  //YANI SAYFAYA URL DEN GELINDIGINDE COMONENT MOUNT EDILECEK VE DE BIZ COMPONENT 
  //MOUNT EDILDIGINDE, DATAYI YINE QUOTES DE GETIRDGIMZ DATAYI ANA REDUX-STATE TEN ALIP
  //ID UZERINDEN BULUP, YINE ENDPOINTE API DEN DATA CEKME ISLEMI YAPMDAN ISMIZI ASALINDA
  //COZEBILIRIZ....

  useEffect(() => {
   if(index===-1){
    console.log("quoteDetailuseEffect icinde request gonderilyor");
    api()
    .get(`/quotes/${quote_id}`)
    .then((res) => res.data)
    .then((data) => setQuote([...data]));
   }
  }, [index,quote_id]);

  //Burda da su sekilde bir yonlendirme yapabiliriz eger istersek
  //Yani diyoruz ki, eger kullanici Link ile tiklayarak gelmemis ise
  //o zaman terar, onu baska bir sayfaya yonlendir....
  //Bu cok gerekli birsey degil ama yapilabilirligi gosterebilmek iicn yapiyoruz
  if(!quoteDetail){
    console.log("Navigate");
   return <Navigate to='/quotes' replace/>
  }

  return (
    <div>
      <h2>QuotesDetails--{quote_id}</h2>
      {index >= 0 ? (
        <pre>{ JSON.stringify(quoteDetail,null,2)} </pre>
      ) : (
        <pre>{quote.length && JSON.stringify(quote[0],null,2)} </pre>
      )}
    </div>
  );
};

export default QuotesDetails;
