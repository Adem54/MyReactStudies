import { useRef } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import { Card } from './Card';
import { LoadingPosts } from './LoadingPosts';
import posts from './data.json';

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;
/*
We just have three page of images but we will wrap over the images and we will 
create a infinitive scrolling effect if we rememeber our useLazyLoad tekes three
arguments one is triggerRef,onGrabData(asagi scroll edince oraya gelmesi gereken datayi fetch
    edecek)
*/

export const Posts = () => {
    const images = posts["data"];//images icinde imageUrl ve owener larin oldugu objelerden olusan dizidir
    const triggerRef = useRef(null);

    //onGrabData sayfa scroll edilince page olarak gelmesini istedimgz data yi fetch edecek olan yer burasi ve
    //dolayisi ile de currentPage i n alinmasi gerekiyor burda..
    const onGrabData = (currentPage) => {

        // This would be where you'll call your API
        return new Promise((resolve) => {
            /* images tum datalarin tutuldug dizidir, ve onun icinde currentPage-1 yapiliyor cunku currentPage 1 iken
            slice da index e gore alindigi icin orda 0 a karsilik geliyor ondan dolayi nerden hangi index ten  alacagimz i belirlemek icin
            bu sekilde yapilir ve amacimiz istedigmz 6 elementi almak kullanici asagi dogru scroll ettigi zaman iste burasi
            gelmesi gereken 6 elementi fetch ediyor
            (currentPage - 1)%TOTAL_PAGES) bu ornegin currentPage scroll asagi indiginde 2 olacak 2-1 ile 1%3 1 in  3il bolumnden kalan 1 dir neden boyle bir islem yapiliyor cunku, bu inifitive olacak yani 3 sayfa gosterilecek ve sonrasinda tekrar basa donup ilk 6 datayi fetch edecek ve surekli asagi indirildikce yani yeni data gosterilmesi saglaniyor
             (currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE demek orn page 2 olunca yani asagi ya ilk scroll edildignde page 2 olacaktir ve
             (2 -1) % 3 * 6  ile burasi 6 olacaktir ve start olarak diyoruz ilk 6 elemandan sonra basla yani 2. sayfay geldiimgzde total
             datamizii tutan images den 7.elementten almaya baslayacak ve  NUM_PER_PAGE * (currentPage%TOTAL_PAGES) 6*(1%3)  ile de 6 eleman alacak
             bu sekilde yaparak bu isin dinamik olmasi saglanmis aslnda..
             
            */
        setTimeout(() => {
            
            const data = images.slice(
            ((currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE,
            NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
            );
            console.log("dataaaaa: ",data);
            resolve(data);
        }, 1000);
        });
    };
    const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
    console.log("data: ",data);
    //Bu data scroll yapildikca, gelen yeni datalari dizi icine 6 sar sar ekleyerek otomatik geliyor
    //Asagi indikce currentPage 1 artiyor , currentPage 1 arttikca yeni 6 data geliyor
    //Ve bizde bu asagi inildikce surekli icine yeni 6 element eklenen dizi olan dat ayi map leyecegiz 
    //ve Card icinde gosterecgiz
    return (
        <>
        <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((image,index) => {
            return <Card key={index} owner={image["owner"]} imageUrl={image["imageUrl"]} />
        })}
        </div>
        {/* Icinde Card componentinin oldugu div elementi 1 page sayfalik data yi postu render ediyor, yani sayfa mizi acilgiidnda karsimza gelen
        ilk sayfadakki 6 data yi render eden yerdir
        Biz bu kullanicinin gordugu sayfanin hemen altinda lazyloaddata eventini tetikleyecegimz LoadingPost componentini tutacagiz
        Kullanicinin gordugu datalarin hemen altinda olusturudmguz, bu elementin dom-karsiligi olan, referansini ttuan useRef ile
        o div i bir degiskene atamis oluyoruz...aynen jscriptte yaptimgiz document.getElementById("") de aldgimz gibi..
        Ve clsx paketini kullanarak dinamik bir sekilde class olusturma islemi yapiyoruz burda yani
        Bu class olusturma islemin bizim ternary kullanarak yaptimgiz class olusturma islemlerine benzeterbiliriz
         <p className={`bold-text ${isError ? 'error' : 'success'}`}> bu mantikla aynidir sadece kutuphane kullanilarak yapilan bir islemdir
         <p className={clsx('bold-text', {'success': !isError, 'error': isError})}>

            <div ref={triggerRef} className={(`trigger ${loading ? 'visible' : ''}`)}> Aslinda budur normal karsiligi kutuphensiz
            yani loaoding true ise, o zaman visible class ini kullan degilse kullanma 
        */}
        <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
            
            <LoadingPosts />
        </div>
        </>
    );
}