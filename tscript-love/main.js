function sayHello(message) {
    console.log(message);
}
sayHello("Hello");
/*
tsc-typescript compiler ts=>js ye ceviriyorlar
Javascript versiyonlari
ES5-Ilk cikarilan versiyon ve tum tarayicilar destekliyor
ES6-(2015) Arrow func,classes, template literal string(`${}`), let, const [...array], spring ve rest operatoru
ES7 ES2016 Array.prototype.includes
ES8 ES2017
Bunlari Ecmascript versions
Tarayicilarin hepsini destekldgi tek version ES5 tir...
Typescript ile biz tum javascript versiyonlarini kullanabiliyoruz ve daha sonra bunlar typescript
 tarafindan derlendiginde ES5 e cevirerek ciktinizin tum browserlarda calismasini sagliyor ki iste bu neden de
 typescriptin kullanilmasindaski en buyuk etkenlerdendir....
 Yani biz javascriptin istedigmiz tum ozellikleri ile kullanabiliyoruz ancak aklimizda acaba bazi brrowserlar desteklemezse nasil
 yaparim diye bir endise olmayacak
*/
// const myName="Adem";
// const myWord=`Ben  ${myName}`;
// const myArr=["coding","with","adem"];
// const copyArray=[...myArr];
var x = "string";
//Biz boyle yapinca typescript bizim x degiskenimizin string oldugunu biliyor..ondan dolayi da 
//x. yaparsak string methodlari gelecegini goruruz...
//x=12;
//Type 'number' is not assignable to type 'string' boyle bir hata aliriz...compiler,transpiler veya development time da
//Ama burda hatayi bize gosteriyor veriyor ama, derlemeyi de yapiyor yani gidip main.js ye baktigimzda x=12 yi main.js 
//de gorebilirz yai derlemeyi engellemiyor type ile ilgili string bir type int degeri vermemiz ama bize ne yapiyor
//typescript yazarken, altini kirmizi ile ciziyor ayni zamanda terminal de bize hata gosteriyor.....
//Bunlari duzeltmek bizden, gelistiriciden bekleniyor...
//Any type
// let y;
//Biz y degiskenini sadece decleare edersek ve deger atamasi yapmaz isek o zaman typescript ona any tipini verecektir
//Yani any type demek diger tum tiplerimizden herhangi birisi olabilir demek Csharp taki object type gibi
var y;
y = "Adem";
//Biz daha sonradan y ye string versek bile typescript onun tipini any olarak gorur ve biz y. yaptigmizda string 
//methodlarinin gelmedgini gorebiliriz...
//Any tipini kullanmak typescripti kullanma amacina tamamen aykiridir, cunku zaten javascriptte bizim boyle bir imkanimz varken biz 
//static type kullanmak icin boyle bir islem yapmak istiyoruz..onun icin any tipini oldugunca kullanmayalim
//Peki y degiskneimizin string oldugunu typescript nasil bilecek iste biz typescriptin anlamasi icin en bastan string tipi
//ile y degskenizmii deklere ederiz
//Typescriptteki typlar
/*
Typescriptteki typelar
Any
Number
String
Boolean
Arrays string[],number[],any[]
Enum
Tuple[type1, type2]
Type Inference
*/
//TYPE INFERENCE
var m = 23;
//dedgimzi zaman zaten typescript bunun bir number type oldugunu biliyor
//Gelip de m ye string bir deger yazmaya calisirsam o zaman hata alaagiz zaten
//m="Adem";
//Dolayisi ile typescriptte bir degiskeni tanimlarken eger deger atamasini beraberinde yapiyorsak
var n = "Zehra";
//Burda aslinda string tipinde olacagini o tipi yazmak :string biraz gereksiz oldu cunku
//typescript onun string tipi olacagini zaten biliyor...
//Iste buna type inference diyoruz, typescriptin bize sagladigi bir kolayliktir
//Ama eger ilk deger atamasi yapmayacak isem  o zaman degskenimiz declere ederken type i ile declerare
//etmeliyiz....bu cook onemlidir
var a;
a = 24;
//ONEMLI...
//Bu arada number da sadece tam sayi degil ondalik sayi da kullanabiliyoruz
a = 24.55;
var b; //ARtik be degskenine istedigmi her type e cevirebiliriz program icerisinde 
//istedgimiz tipi kullanabilirz b ile ama any yi mumkun oldugunca az kullanalim
var c;
c = false;
//artik c ye gelip baska bir tip atayamayiz....
//Array tanimlamalari
var myArray;
myArray = ["A", "B", "C"];
//array elemanlarinin hicbirinin tipini stringden baska bir tipe ceviremeyiz
var myNewArr;
myNewArr = [12, 4, 6];
//Eger arrayimin icindeki elemanlarim istedgimz her turlu tipden olmasini istersek ne yapmaliyiz
//o zaman da yine dizi tipi any olmalidir
var myArr;
myArr = ["Adem", 34, true]; //seklinde dizi icersine istedgmiz her turlu type i girebiliriz...
//Tuple [type1,type2]
//Eger belirli bir size de arrayimiz var ise ve bu arrayimiz icindeki elemanlarin tipleri belli ise
//buna tuple denir
var z;
z = ["Ok", 200];
//Bir array olusturacagiz ve bu arrayin kac tane elemanti olacagi belli ise
//ve elemanlarin tipleri de belli  ise, o zaman ornegin, 1.elemani string, 2. elemani number ise
var error;
error = [404, "Not Found"];
//error=[false,12];//Gelip de tuple verimizde baska bir deger giremeyiz..
//Unknown
//Unknown ile any birbirine cok karistiriliyor
var ma = true;
var my;
//any tipi olacagini soyledgmi my degiskenini gidip, boolean olarak deger atadgimz ma ya 
//any ile tanimladigmiz degskene atama yapabiliyoruz,cunku any de typechecking islemi tam olarak yapilmiyor,
//boolean yerine string veya number da olsa idi sorun olmadan onlara da any tipli degiskeni atayabilirdik....
//Iste bu yuzden any cok da onerilmiyor
ma = my;
//Eger bir tipin ne oldugunu gercekten bilmiyorsak
var notSure;
//Bu sekilde bircok deger atayabiliyoruz..
notSure = "Adem";
notSure = 14;
notSure = false;
notSure = ["Zeynep", "Zehra"];
//Ama mesela gidip te tipi belli olan, bir degiskene notSure degiskenini atayamiyoruz....any ye gore daha any de 
//any ile olusturulmus degiskeni tum tiplere atayabiliyorduk
//ma=notSure;//Type 'unknown' is not assignable to type 'boolean'.ts(
//Type Assertions 
//Bir nevi ben ne yaptigmi biliyorum demektir
//typescriptte yapmamamz gereken sey deger atamadan bir degisken tanimlayip sonra da direk deger atamaktir
//Ya degiskeni deklere ettgimiz anda deger atamamiz gerekir ya da deklere ettigmizde tipi ile deklere
//etmek gerek...
var message;
message = "Adem";
//Biz bir degiskeni tipini tanimlamadan ve de deger de atamadan  deklere edersek kendisi
//default olarak any tipini atayacaktir 
//Ve artik message any tipinde oldugu icin, biz message a sonrdan string deger bile atasak o string
//bir deger tipi olmuyor, any tipinde oluyor ve de string methodlarina biz message uzerinden erisemiyoruz 
//Cunku degeri string degil any tipidir
//message. diyoruz string  methodlarini gettirmiyor
//Ama biz message degerinin string oldugnu biliyoruz ve bu degiskenin string
//olup string methodlarini da getirmek istiyorz,yani intellisensi yakalamk istiyoruz
//Ve typescriptte diyecegiz ki sen dur, ben ne yaptiigmiz biliyorum artik bunu bir string olarak kabul et...
//TypeAssertion gerceklestirecegiz...
//const newMessage=(<string>message).toLowerCase();
//Bir diger yontem olarak da
//const myNewMessage=(message as string).toLowerCase();
//Bu sekilde C# daki casting islemini gerceklestirmis oluyoruz...
//Burda onemli olan nokta daha var , biz burda typescriptte bu sekilde islem yapiyoruz ama ornegin 
//biz message degiskenine basta number olarak atadi isek bu gidip run time dda bunu string e cevirmedigi icin
//burda hata da alabiliriz,cunku typescript burda typeassertion da hata vermiyor ve donsuturuyor gibi duruyor
//
// let testMessage;
// testMessage=200;
// const resultMessage=(testMessage as string).toLowerCase();
// const resultMessage2=(<string>testMessage).toLowerCase();
//testMessagte.toLowerCase bir fonksiyon degil adinda bir hata aliriz....cunku run time da bunu
//javascript degistirmez
//ama, biz deger atamasi yapilan deger e string degeri atar ve sonra dan da o degeri
//string type-casting, yani type assortion yaparsak o zaman sorun yasanmazdi...
//Yani kesin olarak emin olmadan typeassertion lar ile typescripti kandirmaya calismayaalim
//build-in type tipi object
var user = {
    name: "Adem",
    age: 34,
    color: "blue"
};
/*
Biz boyle bir obje olusturdgumuz zaman typescript kendisi burda bir type objesi olusturuyor
let user: {
    name: string;
    age: number;
    color: string;
}
Bu gordugmz key:type seklinde ki obje typescript objesidir, javascript objesi degildir
key:type seklide bir maplaama oluyor, artik biz name e en bastan string adagimz icin name artk
string atanmali,age artik int atanmali ve color artik string degerdir..

*/
//Ya da asagidaki sekidle kendimz type larini vererek isleme devam edebilirz
// let myUser:{
//     name:string;
//     age:number;
//     color:string;
// }={
//     name:"Adem",
//     age:34,
//     color:"Yellow"
// }
// //Typescript inference sayesinde zaten otomatikmen biz deger atarsak, atadgmz degerlere gore tipini atamis 
// //oluyor ondan dolayi eger dogrudan deklere etmekle beraber deger atayacak isek o zaamn type lari bastan vermek
// //cok da anlamli degil 
// let myNewUser:{
//     name:string;
//     age:number;
//     color:string;
// }
// //myNewUser. bu sekilde yaparsak intellisense bize name,age, color in hangi tipte olmalari gerektigni verecektir
// //Diyelim ki biz age i string ya da number her iki deger de olabilir diye kullanmak istersek o zamn nasil yapariz
// //Union Type-
// //Tipleri aralarina pipe | koyarak yazarsak o zaman bu isi cozeriz
// //Union type (type1 | type2 | type3....), buraya yazilan type lardan herhangi birini alir
// let myLastUser:{
//     name:string;
//     age:number | string;
// }={
//     name:"",
//     age:0 | 
// }
// myLastUser.name="Kamil"
// myLastUser.age=34;
// let testUser: {
//     name:string;
//     age:number | string;
//     role:"admin" | "user";//buna da literal type deniyor, sepesifik olarak 2 deger gelecek demek...
// }
// testUser.age=34;
// testUser.age="34";
// testUser.role="admin";
// //We used a union type to specify that the variables can either be of one type or be undefined
// let salary:number | undefined;//could be undefined
// //Kendimize gore bir Custom type olusturuz sonra da onu daha sonra kendimize gore bir type olarak
// //kullanabiliyoruz..C# daki gibi kendi tipimizi de olusturabiliyoruz....
// type Color= {
//     name:"black" | "white";//ya black ya da white olsun diyor
//     hex:"#000"| "#fff";//kullanici gelip oraya baska bir deger giremeyecek
// }
// let user2: {
//     name:string;
//     age:number | string;
//     role:"admin" | "user";
//     color:Color
// }
// user2.color.name="black";//hex degerine ve
// user2.color.hex="#000";
// //Custom type larin devami....
// type myUserType={
//     name:string;
//     age:number | string;
//     role:"admin" | "user";
//     color:Color
// }
// let myNewNewUser:myUserType;
// //dedikki myNewNewUser a tip olarak custom type imiz myNewNewUser i atama yapiyoruz
// myNewNewUser= {
//     name:"Adem",
//     age:34,
//     role:"user",
//     color:{name:"black", hex:"#000"}
// }
//Typescriptteki custom tipler, typescriptte ozeldir ondan dolayi onlar derlenmiyor
//VE biz onlari javgascriptte goremeyiz...
//Literal type,union type,custom type bunlar javascriptte derlenmiyor...
//Fonksiyon Tanimlamalari
//Arrof func
//Birsey dondurmeyen fonksyonlar, fonksiyonun birsey dondurmedgini  de void keywordu ile belirtiriz
var add = function (num1, num2) {
    console.log(num1 + num2);
};
//Biz parametrelere type vermezsek o zaman bu parametrelere kullanici number yerine string
//girebiliyor javascript hata vermiyor, ondan dolayi iste biz, typescript kullanarak parametrelere de
//degerlerini atama yapariz
add(5, 7);
//add("Adem",45);//yazarsak artik hata aliriz, typescript kullanmasa idik burdan hata almayacak idik
//Return yapan fonksyon
var add2 = function (num1, num2) {
    return (num1 + num2);
};
//Buraya dikkat: Eger ozel bir sebebimiz yok ise biz fonksyonlarda hangi tip data donecegmizi veya void mi oldugunu 
//belirtmeyelim cunku typescript zaten, bilyor bizim ne dondurecegimizi, infrence sayesinde,....
//Optional Parametreler
//lastName? optional parametre , yani versemde olur bu parametreye deger vermesem de olur
//(parameter) lastName: string | undefined
var logUser = function (firstName, lastName) {
    console.log(firstName + " " + lastName);
};
logUser("Adem", "Erbas");
//Eger biz ornnegin lastName parametresinin gelmeme durumunda hersey yolunda gitmesini istiyor isek
//o zaman  ? notasyonu ile lastName i belirtiriz ki bu demek oluyor ki lastName gelirse kullan
//gelmezse yokmus gibi davran...Opsiyonel olmasi icin
//Istdgimiz kadar opsiyonel paramtre tanimlayabilirz, ancak suna dikkat zorunlu bir parametrenin
//ardindan opsiyonel parametre tanimlamamlyiz
logUser("Zehra"); //Zehra undefined
//Biz 2 tane parametre ayarlamis isek 2 den daha fazla parametre gondermeyiyuoruz typescriptte
//Default parametreler
//lastName i eger kullanici girmez ise o zaman Erbas ver diyoruz..burda...
//Ama firstName ile ilgili de ister kullanici yazsin isterse de yazmasin diyoruz
var logMyUser = function (firstName, lastName) {
    if (lastName === void 0) { lastName = "Erbas"; }
    console.log(firstName + "  " + lastName);
};
logMyUser("Zeynep"); //Zeynep Erbas
logMyUser("Zeynep", "Cakir"); //Zeynep Cakir
logMyUser("undefined", "Zeynep"); //undefined  Zeynep
//Fonksiyonlarda da literal type(45 | 55) ve union type(string | number) lari kullanabiliriz...
var myFunc = function (number1, number2) {
    console.log(number1 + number2);
};
myFunc(45, 12);
var myNewFunc = function (color) {
    console.log(color);
};
myNewFunc({
    name: "black",
    hex: "#000"
});
//Employee interface ini bir tip olarak olusturalim(C# ta da hatirlar sak interface ler ayni zamanda bir tip tanimlamasi oluyordu)
var newEmployee;
newEmployee = {
    empCode: 1,
    name: "Adem",
    age: 34
};
var newCustomer;
newCustomer = {
    name: "Zehra",
    age: 8,
    id: 1
};
//interface icinde de bir method var number tipinde parametre alan ve de number tipinde birsey donduren
//biz implements deyince zaten isik yanacak ona tiklayip implement et dersek 
//o zaman icindeki degerler otomatik gelecek
//interface i implement eden class interface icindeki elemanlari kullanmak zorundadir..
var Student = /** @class */ (function () {
    function Student(studentCode, name, age) {
        this.getMoney = function (num1) {
            return 10000;
        };
        this.studentCode = studentCode;
        this.name = name;
        this.age = age;
    }
    return Student;
}());
var newStudent = new Student(1, "Zehra", 9); //Seklinde kullaniriz..
console.log(newStudent.getMoney(2));
