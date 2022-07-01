/*
Cannot redeclare block scoped variable
TLDR; TypeScript uses the DOM typings for the global execution environment. In your case there is a 'co' property on the global window object.
Rename the variable, or
Use TypeScript modules, and add an empty export{}:
or
Configure your compiler options by not adding DOM typings:
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a;
var b;
var c;
//Dinamik tipleme yapmak istersek de any keywordunu kullaniriz
//atadgimiz degiskene istedgimiz her degeri atayabilelim istersek o zaman bu isi any ile yapariz
var d;
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
var langs;
langs = ["Phn", "Java", "Python"];
console.log.apply(console, langs);
var langs2;
langs2 = ["Jscript", "React", "Angular"];
console.log.apply(console, langs2);
var numbers;
numbers = [1, 4, 6, 34, 23];
console.log.apply(console, numbers);
var numbers2;
numbers2 = [54, 14, 87, 92];
console.log.apply(console, numbers2);
var boolValues;
boolValues = [true, false];
console.log.apply(console, boolValues);
var boolValues2;
boolValues2 = [false, false, true];
console.log.apply(console, boolValues2);
//Array leri direk tanimladigmiz yerde de degerlerini verebilirz
var langs3 = ["Phn", "Java", "Python"];
console.log.apply(console, langs3);
var langs4 = ["Jscript", "React", "Angular"];
console.log.apply(console, langs4);
//return yapmadigmiz fonksiyonlar-Herhangi birsey donmeyen fonksiyonlar-void fonksiyonlar
//Bu tarz durumlarda return u ancak fonksiyonumuzu daha erken  sonlandirmak icin kullanabiliriz...ama deger donemeyiz...
function addNumbers(num1, num2) {
    console.log(num1 + num2);
}
addNumbers(12, 6);
function GetMyNumbers(num1, num2) {
    if (num1 > 5) {
        console.log("num1 degeri 5 ten buyuk");
        return;
    }
    console.log(num1 + num2);
}
GetMyNumbers(8, 23);
GetMyNumbers(3, 23); //26
//return yaptigmiz fonksiyonlarda da donus tipini veririz
function addMyNumber(num1, num2) {
    return num1 + num2;
}
console.log(addMyNumber(11, 43));
//Default parametre kullanimi
function sumMyNumbers(num1, num2) {
    if (num1 === void 0) { num1 = 12; }
    if (num2 === void 0) { num2 = 0; }
    return num1 + num2;
}
console.log(sumMyNumbers(15)); //Sadece 1.parametre kullanilsin
console.log(sumMyNumbers(null, 65)); //Sadece 2.parametre kullanilsin
console.log(sumMyNumbers()); //Hic parametre kullanilmasin
console.log(sumMyNumbers(21, 15)); //2 parametrede kullanilsin
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
function insertMyNumbers(num1, num2) {
    if (typeof num2 === "undefined") {
        return num1;
    }
    return num1 + num2;
}
console.log(insertMyNumbers(32, 20));
console.log(insertMyNumbers(22));
//Typescriptte Class-Sinflar
var Person = /** @class */ (function () {
    //javascriptte C# gibi dogrudan field lari kullanamiyoruz this keywordu uzerinden kullaniyoruz ondan dolayi constructor parametresine ayni degisken ismi ile deger tanimlamasi yapabiliyoruz...
    //Dikkat edelim biz degiskeni prototyping ile constructor icerisinde uratiyoruz burda...
    //Javascriptte class icindeki tum degerlere this keywordu uzerinden erisiriz, C# da ise hem this keywordu ile hem de this keywordu kullanmadan erisebiliriz
    function Person(name, age, phone) {
        this.name = name;
        this.age = age;
        this.phone = phone;
        console.log("Kisi olusturuldu");
    }
    Person.prototype.showInfos = function () {
        console.log("Name: ".concat(this.name, " Age: ").concat(this.age, "  Phone: ").concat(this.phone));
    };
    return Person;
}());
//Simdide class imizdan bir instance olusturalim
var person1 = new Person("Adem", 34, "45321234"); //new leyince constructor calisti..
person1.showInfos();
//OOP ozelliklerinin typescriptte kullanabilyoruz deneyelim....
console.log(person1.name); //Burda disardan direk erisebiliyor name degiskenine
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
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, age, phone, salary) {
        var _this = _super.call(this, name, age, phone) || this;
        _this.salary = salary;
        return _this;
    }
    //Biz C# daki virtual ozelligini burda dogrudan kullanabiliyyroz tabi javascript tin dinamik type olmasindan da dolayi
    //Yani gelip biz Person icindeki showInfos methodunu ayni isimle ayni sekilde burda employee versionunu kullanacagiz
    //Overriding
    Employee.prototype.showInfos = function () {
        _super.prototype.showInfos.call(this); //bu base.showInfos  ile ayni seydir C# daki, virtual metod mantigindaki
        //showInfos methodunu Person icinde Person versiyonu, Employee icinde ise Person icindeki default degeri ne kendine ait 
        //degeri de girilerek kullaniliyor....override etmis oluyoruz aslinda....
        console.log("Salary: " + this.salary);
    };
    Employee.prototype.changeDepartment = function () {
        console.log("departamn degistiriliyor");
    };
    return Employee;
}(Person));
var employee1 = new Employee("Zehra", 8, "234345554", 1200); //Person u inherit ettigi icin Person icindeki 
//constructor calisiyor ilk olarak sonra Employee nin consturctor i calisir
employee1.showInfos(); //Person icindeki methodu kullaniyor,inherit ettigi icin
employee1.changeDepartment();
var Mysql = /** @class */ (function () {
    function Mysql() {
    }
    Mysql.prototype.add = function () {
        console.log("data added with Mysql");
    };
    Mysql.prototype.get = function () {
        console.log("data got with Mysql");
    };
    Mysql.prototype["delete"] = function () {
        console.log("data deleted with Mysql");
    };
    Mysql.prototype.update = function () {
        console.log("data updated with Mysql");
    };
    return Mysql;
}());
var Mssql = /** @class */ (function () {
    function Mssql() {
    }
    Mssql.prototype.add = function () {
        console.log("data added with Mssql");
    };
    Mssql.prototype.get = function () {
        console.log("data got with Mssql");
    };
    Mssql.prototype["delete"] = function () {
        console.log("data deleted with Mssql");
    };
    Mssql.prototype.update = function () {
        console.log("data updated with Mssql");
    };
    return Mssql;
}());
var Oracle = /** @class */ (function () {
    function Oracle() {
    }
    Oracle.prototype.add = function () {
        console.log("data added with Oracle");
    };
    Oracle.prototype.get = function () {
        console.log("data got with Oracle");
    };
    Oracle.prototype["delete"] = function () {
        console.log("data deleted with Oracle");
    };
    Oracle.prototype.update = function () {
        console.log("data updated with Oracle");
    };
    return Oracle;
}());
var ApplyManager = /** @class */ (function () {
    function ApplyManager() {
    }
    ApplyManager.prototype.add = function (database) {
        database.add();
    };
    ApplyManager.prototype.get = function (database) {
        database.get();
    };
    ApplyManager.prototype["delete"] = function (database) {
        database["delete"]();
    };
    ApplyManager.prototype.update = function (database) {
        database.update();
    };
    return ApplyManager;
}());
//Goruldugu uzere hangi database ile calismak istersek onunla calisabilirz peki bize musteri dedi ki
//ben Postgre dataase ile calisacagim...bakalim sistemimiz nasil entegre olacak interface ler uzerinden
var applyManager = new ApplyManager();
applyManager.add(new Mysql());
applyManager.add(new Mssql());
applyManager.add(new Oracle());
var Postgre = /** @class */ (function () {
    function Postgre() {
    }
    Postgre.prototype.add = function () {
        console.log("data added with Postgre");
    };
    Postgre.prototype.get = function () {
        console.log("data got with Postgre");
    };
    Postgre.prototype["delete"] = function () {
        console.log("data deleted with Postgre");
    };
    Postgre.prototype.update = function () {
        console.log("data updated with Postgre");
    };
    return Postgre;
}());
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
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.get = function () {
        console.log("Database get method");
    };
    Database.prototype.add = function () {
        console.log("Database add");
    };
    return Database;
}());
/*
Abstract class in icinde, sadece imzasi bulunan 2 tane abstract method oldugu icin,
 Database abstract class ini inherit eden MongoDb class i bu abstract methodlari
  implement etmek zorundadir...ayni interface deki mantik gecerlidir,ancak diger
   get ve add virtual methodlarini ise implemente eder ise implemente ettigi icerik
    gecerlidir yok hicbirsey yapmazsa default olarak Database abstract class i icinde ne tanimlandi ise o gecerlidir...
*/
var MongoDb = /** @class */ (function (_super) {
    __extends(MongoDb, _super);
    function MongoDb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MongoDb.prototype["delete"] = function () {
        console.log("data deleted with MOngodb");
    };
    MongoDb.prototype.update = function () {
        console.log("data updated with MOngodb");
    };
    MongoDb.prototype.get = function () {
        _super.prototype.get.call(this); //default degeri calistir birde ayrica alttaki degeri calistir
        console.log("Mongo db get methodu");
    };
    MongoDb.prototype.add = function () {
        _super.prototype.get.call(this); //Hic kullanmasa idik de bu yaptigi ile ayni seyi yapacakti...
    };
    return MongoDb;
}(Database));
var MsAccess = /** @class */ (function (_super) {
    __extends(MsAccess, _super);
    function MsAccess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MsAccess.prototype["delete"] = function () {
        console.log("data deleted with MsAccess");
    };
    MsAccess.prototype.update = function () {
        console.log("data updated with MsAccess");
    };
    MsAccess.prototype.get = function () {
        _super.prototype.get.call(this);
        console.log("MsAccess get method");
    };
    MsAccess.prototype.add = function () {
        console.log("MsAccess added");
    };
    return MsAccess;
}(Database));
