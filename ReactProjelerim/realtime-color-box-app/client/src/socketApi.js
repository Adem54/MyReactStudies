import io from "socket.io-client";
let socket;
//init fonksiyonunu baglanti yapacagim yerde kullanacagiz
export const init=()=>{
    console.log("Sunucuya baglaniliyor")
    socket=io("http://localhost:3001",{
     
        transports:["websocket"],//transport objesini websocket olarak veririz
    })
    //biz io ya dogrudan bagtlanti verirsek oraya baglnati islemini gerceklestirecetir.Bizim back-end imizin kosturdugu portu verecegiz onu da back-end icinde app.js de gorebilirz

    socket.on('connect',()=>console.log("Sunucuya baglanti basari ile gerceklesti"));
}
//Yazmis oldugumz bu foknksiyonu back-ende batglanmak icin gidip App.js dosyamda kullanacagim


//inputtan secilen color i backend e gonderecek olan fonksiyonu yazacagiz
//color secme isini de Palette.js componentinde yapacagimiz icin send fonskiuyonu olan backe-ende gonderme fonksiyonunu Palette icinde yapacagiz
export const send=(color)=>{
    socket.emit('newColor',color);
 
}
   //socket.emit datayi clientda ise backende backendde ise de client a gondermeyi sagliyor-
    //Karsimiza 2 soru geliyor..1.si data,2.si datayi hangi kanala gonderecegiz
    //Hangi kanala gonderecegiz sorusunu backend icindeki app.js dosyasi icinden
    //gelecek olan color i hangi isimle karsiliyor ise  o color a gondermemiz gerekecek ki o isimde newColor ismidir
    //newColor kanalina color degerimizi gonderecegiz
    //Biz bu send foniksiyonunu Palette.js componenti icinde kullanacgaiz

    export const subscribe=(callBack)=>{
        //Anlik islem yapabilmek icin socket in dinlemesi gerekiyor hangi kanali tabi ki receive kanalini dinleyeegiz,cunku backend app.js de bu isijmle emit islemi yapiliyor burda bize back-endden renk gelecek onu loglayarak goerecegiz-
    socket.on('receive', (color)=>{//back-end socket anlik olarak dinliyor...
    console.log(color);//socket.on backendde newColor ile color parametresi aliyordu ve biz zaten send islemi ile bu kanala secilen input color i gonderdik...Ama bu color i biz gonderdik ama bir kez gonderiyoruz useEffect ile sonra bu kaliyor o zaman biz bu color daki anlik degisimin burda alinabilmesi icin setColor i callback icinde calistiracak olan callBack fonksiyonunu burda yazariz......
    callBack(color);//Bunu setActiveColor state timizi App.js de burda calistirip anlik olarak alabilemk icin yaptik ve dikkat edelim parametre olarak da color verince dogrudan back-enddeki aktif color i biz front-endden erismis oluyoruz
})
    }
    //Bu islemi de kullanabilmek icin yine App.js icinde useEffect icinde calistirmamiz gerekiyor
    //color back-end e gonderildigi icn color artik orda ondan olayi colori alabiliyor
    //Bagli olan tum kullanicilarda bir renk seildigi zaman conole.log da gormemiz gerekiyor