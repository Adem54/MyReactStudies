import { useEffect, useReducer, useCallback } from "react";
import debounce from "lodash/debounce";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

const reducer = (state, action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        ...action.payload
      };
    }
    case "onGrabData": {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage + 1
      };
    }
    default:
      return state;
  }
};

//useLazyLoad custom hooku 2 sey donecek 1, data 2.loading
const useLazyLoad = ({ triggerRef, onGrabData, options }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    currentPage: 1,
    data: []
  });

  const _handleEntry = async (entry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
     ( !state.loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD ) 
    ) {
      
      dispatch({ type: "set", payload: { loading: true } });
      const data = await onGrabData(state.currentPage);
      dispatch({ type: "onGrabData", payload: { data } });
    }
  };
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current) {//Eger triggerRef.current true ise o zaman component mount edilmistir
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);
      //INTERSECTION OBSERVER
//Intersection Observer is one of 3 observer based JavaScript APIs with the other two being Resize Observer and Mutation Observer. Intersection Observer in my opinion is the most useful because of how easy it makes things like infinite scrolling, lazing loading images, and scroll based animations. In this article I will cover all the basics of Intersection Observer as well as the more complex nuances so you can start using Intersection Observer to spice up your sites.
      observer.observe(container);
      console.log("observer: ",observer);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  return state;//useLazyLoad hookumuz state i donuyor yani loading,data, ve currentPage  donuyor ve data dikkat edersek
  //useState yerine useReducer ile guncelleniyor ve de...reducer da da gordgumz gibi, her scroll ile assagi inildiginde
  //yeni gelen 6 datayi, diziyi ekleye eklye gidiyor, ki currentPage de surekli artiyor ama 1,2,3,4, diye biz infinitive
  //yani asagi indikce ana datimz icindeki datalar bitince tekrar basa donup bastan getiredcek sekilde bir islem ayarladik
  //fetch edilirken onGrabData da 
  //useLazyLoad Post componenti icinde kullaniliyor dikkat edelim...
  /*
   loading: false,
    currentPage: 1,
    data: []
  */
};

export default useLazyLoad;
/*
Kullanici ekrani actiginda kac tana resim belirledi ise o kadar resim, ornegin 6 resim
fetch edilecek hepsi fetch edilmeyecek, daha sonra kullanici, scrollu asagi dogru cektigi
anda useLazyLoad hook u tetiklenecek ve custom useLazyLoad hook olusturuluyor ve bu bize
yeni bir fetch yeni 6 images sagliyor
triggerRef:Sayfanin sonune ekleyecegimz data objesinin referansidir
onGrabData page number a gore yeni data fetch eden fonksiyondur bu, asagi dogru scroll cekildigi zaman
*/

/*
LAZYLOADING DEKI ANA MANTIK!!!!!
Lazy loading deki ana mantik sudur bizim elimizde ornegn 50 tane images var ise kullanici
galeriyi actiginda kimisi sadece ilk acilan resimlere bakip asagi bile inemzken
kimisi de yarisina bakip yarisina bakmiyor dolayisi ile biz tum resimleri kullanicinin bilgisayarina load
etmemiz aslinda cok gereksiz bir agirlik vermis oluyoruz uygulamaya, cunku resim boyutlari 
uygulamayi performans olarak kasabilecek birseydir ondan da dolayi soyle bir cozum uretilmis
dneilmis ki, biz ayni sayfalama mantiginda ekranda kac resim gostereceksek belirleyelim ornegn 6 ise mesela
o zaman her bir sayfa da 6 element image olacak gibi dusunelim ve de kullanici scroll yaptikca
sanki next e tiklamis gib i bir sonraki 6 element gelsin ve o 6 elementi indirelim, yani kullanici
resimlere bakmak isterse resimleri indirelim ve kullaniciin bakmak istedigi kadarini indirelim
gereksiz yere resimlerin tamamini indirmeyelim....

*/