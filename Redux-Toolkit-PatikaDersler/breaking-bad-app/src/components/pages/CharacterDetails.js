import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { selectItems, selectStatus } from "../../redux/charactersSlice";
import { api } from "../common/api";
import Loading from "../Loading";

const CharacterDetails = () => {
  const [char, setChar] = useState();
  const [loading, setLoading] = useState(true);
  //loading islemlerini lokal olara yapiyoruz burda....Bunu da gidp 
  //useEffect icinde detail endpointine istek gonderdigmiz yerde finally diyerek
  //data geldikten veya error olduktan sonra setLoading ile loadingi guncelleriz
  // let {pathname}=useLocation();
  // console.log("pathname: ",pathname);// => /char/3 u veriyor bize...
  //     let items = useSelector(selectItems);
     const status = useSelector(selectStatus);
  //     console.log("statussss:",status);
  let { char_id } = useParams();
  //hangi id ismi ile yaziliirsa useParams objesi icine o id ile gonderilir
  //  <Route path="char/:char_id" element={<CharacterDetails/>}/>
  console.log("char_id: ", char_id);

  //useEffect kendisi asenkron calisan bir methoddur ondan dolayi daha kendisi
  //calisirken kod asagi dogru gecip alttaki islemlerde hatayi  basip onuun calismasini
  //engelleyebilir...
  useEffect(() => {
    console.log("detailsuseeffect");
    // if(status==="idle"){   }-eger isetersek Home sayfasindan link ile gelirse
    //fetch etme,endpointten getirme, yok sayfa yenilenir ya da url den duserse direk
    //o zaman fetch et de diyebiliriz ya da istersek home sayfasindan geldiginde 
    //de yine fetch yapabilir, datayi endointten alabilir bunda da problem yok
api()
      .get(`/characters/${char_id}`)
      .then((res) => res.data)
      .then((data) => setChar(data))
      .finally(()=>setLoading(false));
 
    
  }, [char_id]);
  console.log("char:", char);

  // const characher=items.find(item=>item.char_id===Number(char_id)) || char;
  // console.log("character: ",characher);
  // const {name,birthday,occupation,img,nickname,portrayed}=characher;

  //BIR PROBLEMIMIZ VAR BURDA
  //KULLANICI BURAYA TAMAM HOME PAGE DEN DATALARIN OLDUGU SAYFADAN ISTEDIGI BIR DATANIN
  //DETAYLARNI GORMEK ICIN GELDIGINDE BIR PROBLEM YOK, DATA GELIYOR AMA EGER KULLANICI
  //DETAY SAYFASINA GELDIKTEN SONRA, SAYFAYI YENILERSE YA DA KULLANICI DIREK
  //URL UZERINDEN http://localhost:3000/char/1 YAZARAK HERHANGI ID LI BIR DATAYA
  //ERISMEYE CALISIRSA, O ZAMAN CHARACTERDETAIL COMPONENT MOUNT EDILIYOR AMA
  //TABI, LINK REACT-ROUTER-DOM UZERINDEN GELMEDIGI ICIN, ID YI BULAMIYOR VE DE
  //DATA DETAYINI GETIREMIYOR BU YUZDEN, SAYFAYA URL DEN, YA DA SAYFA YENILENEREK
  //GELDIGINDE STATE TIMIZ DE YENIDEN BASLATILACAGI ICIN, STATUS DURUMU BASLANDICTAN "IDDLE"
  //OLARAK BASLATILACAKTIR...TERKRARDAN BUNDAN DOLAYI COZUM ICIN
  //1-BU SAYFAYA KULLANICI HER GIRDIGINDE FETCH ISLEMI-REQUEST ISLEMI YAPARAK DETAY BILGILERI ALINIR
  //DETAY END-POINTINDEN
  //2-BU ADRESE GIRDIGINDE ONCE STATE ICINDE TUTTUMGUZ DATAYA BAKILIR BU ID YE AIT DATA VAR MI
  //ID BIZE HER TURLU ADRES CUBUGUNDA OLACAK VE BIZDE O AN ICIN USTUNDE OLDUGMUZ URL I DE ALABILIYORUZ
  //UZERINDE BULUNDUGMUZ ID LI DATA ANA STATE TIMIZ ICINDE VAR MI ONA BAKILIR EGER YOKSA, O ZAMAN
  //FETCH-REQUEST ISLEMI DETAIL ENDPOINTINDEN YAPILIR....
  //USELOCATION UZERINDEN, ADRES CUBUGUNA GIRILEN URL I HER TURLU ALABILIYORUZ, KULLANICI ISTER
  //LINK UZERINDEN GELSIN, ISTER SAYFA YENILESIN, ISTER DE DOGRUDAN URL E YAZARAK DUSSUN...
  //BU ARADA USELOCATION I KULLANMADAN DA USEPARAMS ZATEN HER TURLU BIZE HANGI ID DEN GELINDIGINI VERIYOR
  //KULLANICI NERDEN GELIRSE GELSIN, LINK UZERINDEN OLABILIR, VEYA DIREK ADREES CUBUGUNDAN OLABILIR
  // USEPARAMS BIZE HANGI ID ILE GELINDIGINI VERIYOR
  //BIZE DETAY DATASI SADECE BU COMOPNENTTE LAZIM OLACAK ONDAN DOLAYI BIZ BU COMPONENTE OZEL LOCAL BIR STATE
  //OLUSTURURUZ USESTATE ILE VE DE REQUEST ILE DETAY-ENDPOINTINDEN DATALARI LOKAL STATE DE TUTARIZ...
  //BU ARADA BIZ BIZE LIN UZERINDEN HOME SAYFASINDAN MI GELIYOR YOKSA DIREK ADRES CUBUGNUDAN MI DUSTU BUNU DA YINE
  //STATUS UZERINDEN ANLAYABILIYORUZ....ADRES CUBUGUNDAN GELIRSE SAYFA RENDER EDILECEGI ICIN STATUS IDLE DIR YOK HOME
  //SAYFASINDAN GELIRSE STATUS SUCCEDED OLARAK GELIR
  //3.olarak da root state uzerindden index.js mizde root.dispatch() ile biz detay datalarini getirecek fonksiyonu calistirip ordan datayi alirzi

  return (
    <>
      {loading && <Loading/>}
      {/* <ul>
        <li>Name: {name}</li>
        <li>Birthday: {birthday}</li>
        <li>Occupation: {occupation[0]}</li>
        <li>NickName: {nickname}</li>
        <li>Portrayed: {portrayed}</li>
      
    </ul>
    <img alt={name} src={img} style={{width:"15rem"}}/> */}

     {/*char var ise veya loading false ise de diyebilirz */}
      {char && (
        <div>
          <ul>
            <li>Name: {char[0].name}</li>
            <li>Birthday: {char[0].birthday}</li>
            <li>Occupation: {char[0].name[0]}</li>
            <li>NickName: {char[0].nickname}</li>
            <li>Portrayed: {char[0].portrayed}</li>
          </ul>
          <img
            alt={char[0].name}
            src={char[0].img}
            style={{ width: "15rem" }}
          />
          {!loading && <pre>{JSON.stringify(char,null,2)}</pre>}
        </div>
      )}
    </>
  );
};

export default CharacterDetails;
