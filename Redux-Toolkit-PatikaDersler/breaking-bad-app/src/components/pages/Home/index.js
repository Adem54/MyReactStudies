import React from "react";
import Masonry from "react-masonry-css";
import "./style.css";
import {
  selectItems,
  getCharactersAsync,
  selectStatus,
  selectError,
  selectPage,
  selectHasNextPage,
} from "../../../redux/charactersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../Loading";
import Error from "../../Error";
import {Link} from "react-router-dom";

const Home = () => {
  let items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const nextPage = useSelector(selectPage);
  // const lastPage = useSelector(selectLastPage);
  const hasNextPage = useSelector(selectHasNextPage);
  console.log("items: ", items);
  console.log("status: ", status);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEFfect calisiyor");
    if(status==="idle"){
      dispatch(getCharactersAsync());
    }
  }, [dispatch,status]);
//Artik status u idle ise diyerek ten, detay sayfasina gidip geldigidne
//status degismediigi icin, tekrar yeni bir request gondermiyor useEffect
//tetikleniyor component mount edildigi icin ama if condition i ile biz
//request isleminin tekrar  yapilmasini onluyoruz, ki status uzerinden cozuyoruz
//Harika bir cozum,, cunku detay sayfasina gidilmesi, aslinda biz yine
//index.html deyiz tek sayfa uzerinde sadece bizim bu sayfamizda gosterilecek
//elementler degisiiyor ve iste bunun da yonetimi status uzerinden yapiliyordu
//COOOOK ONEMLI BESTPRACSTISE....BU TARZ DURUMLARDA SAYFA DEGISMI VS , EKRANDAKI
//GOSTERILEN DEGERLERIN DEGISME DURUMLARINDAS GELEN DATALARIN YONETIMINDE HERZAMAN
//STATUS,VEYA MODE DURUMLARI UZERINDEN YONETMEYI DUSUNELIM....
  const handleNextPage =async () => {
    console.log("Next-page");
  await  dispatch(getCharactersAsync(nextPage));
  };

  if (status==="failed") return <Error error={error} />;

  return (
    <>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {items.map((item) => (
          <div key={item.char_id}>
            {/* Gitmesini istdigmiz Component hangisi ise onun App.js de path i ne ise burda onu verecegiz
             <Route path="char/:char_id" element={<CharacterDetails/>}/> bu path formatina uygun yazmamiz gerekiyor
            */}
             <Link  to={`char/${item.char_id}`}>
            <img alt={item.name} src={item.img} className="character" />
            <div className="char-name"> {item.name}</div>
            </Link>
          </div>
        ))}
      </Masonry>
      {status==="loading" && <Loading />}
      {/* {lastPage && (
        <div className="data-finished">Gosterilecek veri kalmadi!</div>
      )} */}
      {/* Eger gosterilecek veri kalmadi ise hem bir mesaj veririz veri kalmadi hem de butonu passif hale getiririz...ki kullanici bos yere
    request gondermesin.....Hatta bunun yerine butonu komple kaldiralim eger ki gelecek veri kalmadi ise butonu komple kaldiralim biz eniyisi */}
      {/* <button disabled={lastPage} className="next-page"
    onClick={()=>handleNextPage()}
    >Load More({nextPage})</button> */}
      {/*Burda loading button ile ust uste geliyorda ondan loading varken buton gozukmesin yaptik... */}
      {hasNextPage && status!=="loading" && (
        <button className="next-page" onClick={() => handleNextPage()}>
          Load More({nextPage})
        </button>
      )}

      {!hasNextPage && (
        <div className="data-finished">Gosterilecek veri kalmadi!</div>
      )}

      {/*Gosterilecek sayfa kalmadi ise ve tiklaninca oraya gidiyorsa orda da gosterilecek baska bir sayfa kalmadi diye bir aciklama gosterebiliriz */}
    </>
    // </div>
  );
};

export default Home;

/*
<div className="homeContainer">
    {items.map(({char_id,name,img},index)=>{
     return <div key={char_id} className="card">
      <img src={img} alt={name} style={{ width:`${index>=items.length-2 ? "30%" :"100%"}`,  }} />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <p></p>
      </div>
      </div>
    })}

*/
