/*
Cannot redeclare block scoped variable
TLDR; TypeScript uses the DOM typings for the global execution environment. In your case there is a 'co' property on the global window object.
Rename the variable, or
Use TypeScript modules, and add an empty export{}:
or
Configure your compiler options by not adding DOM typings:
*/

let a: string;
let b: number;
let c: boolean;
//Dinamik tipleme yapmak istersek de any keywordunu kullaniriz
//atadgimiz degiskene istedgimiz her degeri atayabilelim istersek o zaman bu isi any ile yapariz
let d: any;
a = "Hello my frinend";
b = 15;
c = true;
console.log("Hello world");
//d=21;
//d="Adem";
d = false;
//atadgimiz degiskene istedgimiz her degeri atayabilelim istersek o zaman bu isi any ile yapariz
console.log(d);
//arrayleri typescript ile tanimlama
let langs: string[];
langs = ["Phn", "Java", "Python"];
console.log(...langs);
let langs2: Array<string>;
langs2 = ["Jscript", "React", "Angular"];
console.log(...langs2);
let numbers: number[];
numbers = [1, 4, 6, 34, 23];
console.log(...numbers);
let numbers2: Array<number>;
numbers2 = [54, 14, 87, 92];
console.log(...numbers2);
let boolValues: boolean[];
boolValues = [true, false];
console.log(...boolValues);
let boolValues2: Array<boolean>;
boolValues2 = [false, false, true];
console.log(...boolValues2);
//Array leri direk tanimladigmiz yerde de degerlerini verebilirz
let langs3: string[] = ["Phn", "Java", "Python"];
console.log(...langs3);
let langs4: Array<string> = ["Jscript", "React", "Angular"];
console.log(...langs4);

//return yapmadigmiz fonksiyonlar-Herhangi birsey donmeyen fonksiyonlar-void fonksiyonlar
//Bu tarz durumlarda return u ancak fonksiyonumuzu daha erken  sonlandirmak icin kullanabiliriz...ama deger donemeyiz...
function addNumbers(num1: number, num2: number):void {
  console.log(num1 + num2);
}

addNumbers(12, 6);

function GetMyNumbers(num1:number,num2:number):void {
    if(num1>5){
        console.log("num1 degeri 5 ten buyuk");
        return;
    }
    console.log(num1+num2);
}

GetMyNumbers(8,23);
GetMyNumbers(3,23);//26
//return yaptigmiz fonksiyonlarda da donus tipini veririz
function addMyNumber(num1: number, num2: number): number  {
  return num1 + num2;
}
console.log(addMyNumber(11,43));
//Default parametre kullanimi

function  sumMyNumbers(num1:number=12,num2:number=0):number {
    return num1+num2;
}

console.log(sumMyNumbers(15));//Sadece 1.parametre kullanilsin
console.log(sumMyNumbers(null,65));//Sadece 2.parametre kullanilsin
console.log(sumMyNumbers());//Hic parametre kullanilmasin
console.log(sumMyNumbers(21,15));//2 parametrede kullanilsin

/*
Opsiyonel parametre kullanimi
Eger bir deger bazi durumlarda kullanilacak bazi durumlarda da kullanilmayacak
 ise ? notasyonu kullanarak bunu handle edebiliriz
A required parameter cannot follow an optional parameter.-Eger opsiyonel bir parametr
 e yani ? ile kullanilmis bir parametreden sonra zorunlu bir parametre yani normal bir
  parametre girersek opsiyonel olmayan, ilk degeri olmayan bir parametre girersek
   o zaman hata aliriz ondan dolayi opsiyonel parametreler her zaman 
zorunlu parametrelerden sonra yazilmalidir
 num2?:number demek aslinda (parameter) num2: number | undefined, parametreye deger
  atanmaz ise, undefined olacaktir demektir... 
Tabi bunu engellemek icin if operatoru kullanabilirz
typeof ile type kontrolu yaparken undefined type olup olmadigini cek etmek icin undefined 
degeri tirnak isaretleri icerisinde yazilmalidir..
BURASI ONEMLIDIR-undefined degerini kontrol edeerken "undefined" tirnak icinde yazilmalidir
*/
function insertMyNumbers(num1:number,num2?:number):number {
    if(typeof num2==="undefined"){
        return num1;
    }
     return num1+num2;
}
console.log(insertMyNumbers(32,20));
console.log(insertMyNumbers(22));

//Typescriptte Class-Sinflar
class Person {
    public name:string;
    public age:number;
    private phone:string;
    //javascriptte C# gibi dogrudan field lari kullanamiyoruz this keywordu uzerinden kullaniyoruz ondan dolayi constructor parametresine ayni degisken ismi ile deger tanimlamasi yapabiliyoruz...
    //Dikkat edelim biz degiskeni prototyping ile constructor icerisinde uratiyoruz burda...
    //Javascriptte class icindeki tum degerlere this keywordu uzerinden erisiriz, C# da ise hem this keywordu ile hem de this keywordu kullanmadan erisebiliriz
    constructor(name:string,age:number,phone:string){
           this.name=name;
            this.age=age;
            this.phone=phone;
            console.log("Kisi olusturuldu");
    }

  public showInfos(){
        console.log(`Name: ${this.name} Age: ${this.age}  Phone: ${this.phone}`)
    }
}

//Simdide class imizdan bir instance olusturalim
let person1=new Person("Adem",34,"45321234");//new leyince constructor calisti..
person1.showInfos();

//OOP ozelliklerinin typescriptte kullanabilyoruz deneyelim....
console.log(person1.name);//Burda disardan direk erisebiliyor name degiskenine
//Ancak biz bunu disariya kapatmak istersek private modifierini ekleyebiliyoruz...
/*
class Person {
    public name:string;
    private age:number;
    private phone:string;
*/
// console.log(person1.phone);//Property 'phone' is private and only accessible within class 'Person'.

//Simdi de Inheritance Ozelligine bakalim
//Employee ye eger Person i inherit ederse o zaman Employee ye sen bir Person sin demis oluruz.. ve 
//Person icindeki tum ozelliklere(private olmayan) artik Employee nin erisebilmesini saglamis olurz...
//Ayrica base class, veya super class olan Person, subclass olan Employee tarafindan inherit edilince, eger
//base, super class ta consturctor icinde parametreler mevcut ise o zaman, onlari kendi constructor i icerisinde
//super() keywordu icinde invoke etmelidir ki, Employee olusturmaya claistigmizda gitsin once bir onun inhert
//ettigi Person i calistirarak ise baslasin ki Employee de Person in ozelliklerini kullanabilsin
class Employee extends Person {
    //Simdi buraya sadece Employee ye ait olan bir deger girelim
    salary:number;
    constructor(name:string,age:number,phone:string,salary:number){
        super(name,age,phone);//Bu nedir bu base(name,age,phone) ile ayni seydir....
       this.salary=salary;
    }
    //Biz C# daki virtual ozelligini burda dogrudan kullanabiliyyroz tabi javascript tin dinamik type olmasindan da dolayi
    //Yani gelip biz Person icindeki showInfos methodunu ayni isimle ayni sekilde burda employee versionunu kullanacagiz
    //Overriding
    showInfos(){
        super.showInfos();//bu base.showInfos  ile ayni seydir C# daki, virtual metod mantigindaki
        //showInfos methodunu Person icinde Person versiyonu, Employee icinde ise Person icindeki default degeri ne kendine ait 
        //degeri de girilerek kullaniliyor....override etmis oluyoruz aslinda....
        console.log("Salary: "+this.salary);
    }
    changeDepartment(){
        console.log("departamn degistiriliyor");
    }
}
let employee1=new Employee("Zehra",8,"234345554",1200);//Person u inherit ettigi icin Person icindeki 
//constructor calisiyor ilk olarak sonra Employee nin consturctor i calisir
employee1.showInfos();//Person icindeki methodu kullaniyor,inherit ettigi icin
employee1.changeDepartment();

//Interface yapilar
//Biz farkli veritabanlarinda fleksibel birsekilde calismak istiyoruz mesela...
interface IDatabase{
   add();
   get();
   delete();
   update();
}

class Mysql implements IDatabase {
    add() {
        console.log("data added with Mysql")
    }
    get() {
        console.log("data got with Mysql")
    }
    delete() {
        console.log("data deleted with Mysql")
    }
    update() {
        console.log("data updated with Mysql")
    }
}


class Mssql implements IDatabase {
    add() {
        console.log("data added with Mssql")
    }
    get() {
        console.log("data got with Mssql")
    }
    delete() {
        console.log("data deleted with Mssql")
    }
    update() {
        console.log("data updated with Mssql")
    }
}

class Oracle implements IDatabase {
    add() {
        console.log("data added with Oracle")
    }
    get() {
        console.log("data got with Oracle")
    }
    delete() {
        console.log("data deleted with Oracle")
    }
    update() {
        console.log("data updated with Oracle")
    }
}

class ApplyManager{

    add(database:IDatabase){
          database.add();  
    }
    get(database:IDatabase){
        database.get();
    }
    delete(database:IDatabase){
        database.delete();
    }
    update(database:IDatabase){
        database.update();
    }
}

//Goruldugu uzere hangi database ile calismak istersek onunla calisabilirz peki bize musteri dedi ki
//ben Postgre dataase ile calisacagim...bakalim sistemimiz nasil entegre olacak interface ler uzerinden
let applyManager=new ApplyManager();
applyManager.add(new Mysql());
applyManager.add(new Mssql());
applyManager.add(new Oracle());

class Postgre implements IDatabase{
    add() {
        console.log("data added with Postgre")
    }
    get() {
        console.log("data got with Postgre")
    }
    delete() {
        console.log("data deleted with Postgre")
    }
    update() {
        console.log("data updated with Postgre")
    }
}

//Simdi bakalim sistemimizde Postrgre ile calistirabilecek miyiz...
applyManager.add(new Postgre());
applyManager.get(new Postgre());
//Gordugmuz gibi diger kodlarin hicbirine dokunmadan projemize yeni bir ozelligi
//inteface sayesinde kolayca entegre ettik...


/*
Abstract class
interface ile inherit in birlesmis hali gibidir
Hem imza,body si olmayan methodlar zorunlu kullanilmasi gereken(absstract) hemde 
body si olan govdesi olan icinde default degeri olan, veya hicbirdeger de olmayanabilir
 ve abstract class i inherit eden class larin methodlarin icini kendi isteklerine gore 
 doldurduklari methodlardir virtual methodlardir  yani
Abstract class lar new lenemezler
sadece imzasi ile kullandgimiz methjodlarin basina abstract getiririz
Ama virtual methodlarin basina typescriptte birsey getirilmez dogrudan virtual method 
gibi davraniyorlar zaten...
*/
abstract class Database {
    get(){
        console.log("Database get method");
    }

    add(){
        console.log("Database add");
    }
    //get ve add methodu ortak oldugunu dusunelim, herkes bu iki methodu aynen kullanacak
    //ama delete ve update methodunu ise herkes kendi ihtiyacina gore kullanacagini farzediyoruz...
    abstract delete();
    abstract update();
    
}

/* 
Abstract class in icinde, sadece imzasi bulunan 2 tane abstract method oldugu icin,
 Database abstract class ini inherit eden MongoDb class i bu abstract methodlari
  implement etmek zorundadir...ayni interface deki mantik gecerlidir,ancak diger
   get ve add virtual methodlarini ise implemente eder ise implemente ettigi icerik
    gecerlidir yok hicbirsey yapmazsa default olarak Database abstract class i icinde ne tanimlandi ise o gecerlidir...
*/
class MongoDb extends Database {
    delete() {
        console.log("data deleted with MOngodb")
    }
    update() {
        console.log("data updated with MOngodb")

    }

    get() {
        super.get();//default degeri calistir birde ayrica alttaki degeri calistir
        console.log("Mongo db get methodu")
    } 
    add(){
        super.get();//Hic kullanmasa idik de bu yaptigi ile ayni seyi yapacakti...
    }
}

class MsAccess extends Database{
    delete() {
        console.log("data deleted with MsAccess")
    }
    update() {
        console.log("data updated with MsAccess")
    }

    get(): void {
        super.get();
        console.log("MsAccess get method");
    }
    add(): void {
        console.log("MsAccess added");
    }
}