import React, {ChangeEvent, useReducer, useRef, useState } from "react";
interface IProps {
    name:string;
    description?:string;
    label?:string;
 //    onSmthHappen :(name:string)=>void;//birsey donmedigmiz icin hata aliyoruz
     //Type void is not assigneable diye haata aliyrz
     onSmthHappen:(name:any)=>any;
     // onSmthHappen(name:string):void;//bu ustteki fnks tanimi ile ayni
    //name isminde string bir parametre alan ve void donen bir fonks demektir
}

type Count={
    age:number | null;
}

interface ICount {
    age:number | null;
}

interface Note {
    content:string;
}
//Action icinde ya boyle bir obje ya da boyle bir obje alacak diyoruz
//cunku sadece add ve remove islemi olacak note lar ile ilgili
type Actions={type:"add", content:string} | {type:"remove", id:number};
type State=Note[];
const NotesReducer=(state:State, action:Actions)=>{
    switch (action.type) {
        case "add":
            return [...state, {content:action.content}];
        case "remove":
            return state.filter((x,i)=>action.id!==i);//remove da action objesi geliyor icinde id var

        default:
            return [...state];
    }
}
const Hello:React.FC<IProps> = ({name,description="Defatul description",label,onSmthHappen}) => {
    const [notes,dispatch]=useReducer(NotesReducer,[]);


        const [count, setCount]=useState<number | string | null | undefined>(1453);
        const [myCount,setMyCount]=useState<Count>({age:33})
        //count a direk number degeri atadigmiz icin type-inference sayesinde typescript bunun 
        //artik number type oldugunu biliyor


    const handleChange=(event:ChangeEvent<HTMLInputElement>):void =>{
        //evente tip atamis olduk, ne ise yaradi, bu eventin propertieslerine erismemize yariyor
        //ayrica event in tipini tanimlamdimgiz zamanda zaten hata aliyoruz
        
        
    }

    const myHandleChange=(event:React.FormEvent<HTMLDivElement>):void=>{
            //event lerin propertieslerine de erismemizi sagliyor event e tip vermek
    }

    const inputRef=useRef<HTMLInputElement>(null);
    const divRef=useRef<HTMLDivElement>(null);
    const btnRef=useRef<HTMLButtonElement>(null);
  return (
   
    /*(property) React.ClassAttributes<HTMLDivElement>.ref?: React.LegacyRef<HTMLDivElement> | undefinedhtml div element gelecek tip olarak*/ 
    <div ref={divRef}>
      {/*(property) React.ClassAttributes<HTMLButtonElement>.ref?: React.LegacyRef<HTMLButtonElement> | undefined */}
        <button ref={btnRef}></button>
    <h2>Hello- {name}{description}</h2> 
    <h3>{onSmthHappen(name)}</h3>
{/*ref in tipii yine eventlerdeki hover teknigi ile uzerine gelerek ordan tipini alacagiz
(property) React.ClassAttributes<HTMLInputElement>.ref?: React.LegacyRef<HTMLInputElement> | undefined
*/}
    <input type="text" ref={inputRef} />
    <input  type="text" onChange={handleChange} />
    {/* onChange uzerinde gedligmiz zaman onChange nin ne dondurdugunu ve nasil bir tip olacagini gorebiliyoruz
     (property) React.InputHTMLAttributes<HTMLInputElement>.onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined 
     ordan biz dondurdugu tipi burdan gorebiliriz ve gidip bunu event: tin tipi olarak kullanabilirz-Handler kismini kullanmiyoruz
     */}

     <div onChange={myHandleChange} />
     {/*property) React.DOMAttributes<HTMLDivElement>.onChange?: React.FormEventHandler<HTMLDivElement> | undefined
     Handler kismini tip tanimlarken kullanmiyuoruz
     onChange i gelip div icinde kullaninca bu sefer event in tipi degisiyor dikkat edelim
     
     */}
{/*Auto-complete avantaji sagliyor ve bize hangi tip girmemiz gerektigi soylyor
(property) React.DOMAttributes<HTMLButtonElement>.onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
Handler kullanma yoksa hata aliyoruz...
 */}
     <button onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>dispatch({
        type:"add",
        content:"My-Note"
     })}></button>
    </div>
  )
}

export default Hello
/*
COK ONEMLI....
Bu componente App.tsx componentinden bir props gonderildigi zaman
{name}:{name:string} parametre de biz direk obje icinde aliyoruz
destructorions mantiginda ve iste obje icinde direk alirsak da 
typescriptte type ini bu sekilde verebiliriz yoksa, sadece {name:string }
seklinde veremeyiz...
{name:string } sadece bunu verirsek bu sadece bir name degeri olacak ve
tipi string olacak demektir, App.tsx den gelen propsun degerini 
almis olmayiz bu sekilde, alabilmek icin 
{name}:{name:string} 
Ama bizim gonderilen props lar arttikca, burda parametrede uzayan bir tip tanimlamasi ve
deger atamasi olacak ve hic de duzgun bir gorunum olusmayacak ondan dolayi
const Hello = ({name,description,label}:{name:string,description:string,label:string}) => {
  return (
O zaman bunu daha iyi nasil ele aliriz....
BUNU COK KKULLANACAGIZ....
interface imiz ile kullanacagiz
Yani interface imiz ile veri yapimiz nasil olacak ise once onu interface imiz
ile tanimlariz ki custom type tanimlamaya cok benziyor...sonra da biz her bir
obje propertieas ini ayri ayri tanimlamak yerine interface ler ile tanimlayarak
direk interface ismini kullanabiliriz
interface IProps {
    name:string;
    description:string;
    label:string;
}
const Hello = ({name,description,label}:IProps) => {
  return (
    AYNI ISLEMI CUSTOM TYPES ILE DE YAPABILIRZ

    type Props= {
    name:string;
    description:string;
    label:string;
}
const Hello = ({name,description,label}:Props) => {
  return (
    
    BU ISLEMI REACT ICINDE KULLANIRKEN ISE BIRAZ DAHA FARKLI
    BIR SEKILDE, C# A DA BENZER BIR SEKILDE KULLANABILIRIZ

interface IProps {
    name:string;
    description:string;
    label:string;
}
const Hello:React.FC<IProps> = ({name,description,label}) => {
  return (
    React.FC=>React.FunctionalComponent

    Peki typesscript kullanmak bize ne kazandirdi?
    Biz direk Hello componenti icerisinde bize App.tsx den hangi componentler geliyor bunlari
    gorebiliyor olacagiz, cunku onlari kullanmadigmiz zaman typescript bize sana boyle boyle
    props lar geliyor ama sen bunlari kullanmiyorsun gibi bir uyari veriyor
    
    Peki benim Hello componentinde ben oraya gonderilen tum, propslari kullanmak istemiyorum
    ama hata da gormek istemiyorum ne yapiyorduk bu durumlarda, kullanmak istemedgimiz veya
    duruma gore kullanacagimiz propslari optioanal sekilde type tanimlamasi yaparak hata vermesini
    engelleyebilirz... Hatta soyle ki biz Hello componentinde label isminde bir props gelecek diye aliyoruz
    ama bu bize App.tsx den gonderilmiyor normalde typescript hata verecektir ancak, bu hatayi iste
    gonderilmesii bekldgimiz ama gonderilmeyen label parametresini optional yaparak engelleyebilriz

    interface IProps {
    name:string;
    description:string;
    label?:string;
}
const Hello:React.FC<IProps> = ({name,description,label}) => {
  return (

    Birde fonksiyon props olarak gonderilme durumuna bakalim

    interface IProps {
    name:string;
    description:string;
    label?:string;
    onSmthHappen :(name:string)=>void;//birsey donmedigmiz icin hata aliyoruz
     Type void is not assigneable diye haata aliyrz
     onSmthHappen:(name:any)=>any;
     onSmthHappen(name:string):void;//bu ustteki fnks tanimi ile ayni
    name isminde string bir parametre alan ve void donen bir fonks demektir

const Hello:React.FC<IProps> = ({name,description,label,onSmthHappen}) => {
  return (
    <div>
    <h2>Hello- {name}{description}</h2> 
    <h3>{onSmthHappen(name)}</h3>
    </div>
  )
}

DEFAULT PROPS YAPISINA BAKALIM-EGER BIZE DESCRIPTION GONDERMEZ ISE DEFAULT DEGER VERELIM
interface IProps {
    name:string;
    description?:string;
    label?:string;
    onSmthHappen :(name:string)=>void;//birsey donmedigmiz icin hata aliyoruz
     Type void is not assigneable diye haata aliyrz
     onSmthHappen:(name:any)=>any;
     onSmthHappen(name:string):void;//bu ustteki fnks tanimi ile ayni
    name isminde string bir parametre alan ve void donen bir fonks demektir

    Default kullanabilmek icinde oncelikle, interface icindeki tip tanimlamada ? description i 
    opsiyonel yapariz...yoksa hata aliriz ona gore dikkat edelim... ? bizi undefined da olabilir diyerekden
    undefined durumunda uygulamanin kirilmasindan bizi koruyor...
    Sonra da 
    const Hello:React.FC<IProps> = ({name,description="Defatul description",label,onSmthHappen}) => {
  return (

    EVENTLER ILE TYPESCRIPT KULLANMAK

const Hello:React.FC<IProps> = ({name,description="Defatul description",label,onSmthHappen}) => {
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>):void =>{
        evente tip atamis olduk, ne ise yaradi, bu eventin propertieslerine erismemize yariyor
        ayrica event in tipini tanimlamdimgiz zamanda zaten hata aliyoruz
        
        
    }

    const myHandleChange=(event:React.FormEvent<HTMLDivElement>):void=>{
            
    }
  return (
    <div>
    <h2>Hello- {name}{description}</h2> 
    <h3>{onSmthHappen(name)}</h3>
    <input  type="text" onChange={handleChange} />
    {/* onChange uzerinde gedligmiz zaman onChange nin ne dondurdugunu ve
     nasil bir tip olacagini gorebiliyoruz
     (property) React.InputHTMLAttributes<HTMLInputElement>.onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined 
     ordan biz dondurdugu tipi burdan gorebiliriz ve 
     gidip bunu event: tin tipi olarak kullanabilirz-Handler kismini kullanmiyoruz
     */
    /*}
/*
     <div onChange={myHandleChange} />
     {/*property) React.DOMAttributes<HTMLDivElement>.onChange?: React.FormEventHandler<HTMLDivElement> | undefined
     Handler kismini tip tanimlarken kullanmiyuoruz
     onChange i gelip div icinde kullaninca bu sefer event in tipi degisiyor dikkat edelim
     
     */
    /*}


}

React Hookslar ile Typescript kullanimi
useState,useRef 

 const [count, setCount]=useState(1453);
        //count a direk number degeri atadigmiz icin type-inference sayesinde typescript bunun 
        //artik number type oldugunu biliyor

        Yani useState kullanirken direk deger atamasi yapiyorsak, baslangic deger atmaasi ki
        genellikle useState ti zaten boyle kullaniriz, o zaman deger atamamiza gerek yok cunku
        artik ilk atadigmiz deger ne ise o type da deger atamamiz gerekecek
        Ama eger,biz illa da tip tanimlayalim dersek, useState de o zaman onu su sekilde yapacagiz.
Biz eger birden fazla type atayabileyim dersek o zaman union type kullanabiliriz | demek veya demektir typescriptte
         const [count, setCount]=useState<number | string | null | undefined>(1453);
         //count state timiz ,number,string,null veya undefined degerlerini alabilir demektir
         const [text,setText]=<string>();//burda text state i string olacak demis oluruz..
         
         State i Obje olarak tanimlamk
        const [myCount,setMyCount]=useState<{age:number | string}>({age:33})
        objelerde tip tanimlarken yine bir obje icinde propertieslerin tiplerii tanimlariz
        TABI BU ARADA BIZ OBJELERDE DIREK OBJE OLARAK TIP TANIMLAAMK YERINE YA INTERFACE LERDEN
        FAYDALANIRIZ YA DA CUSTOM TYPE LARDAN YARARLANARAK UZUN UZUN YAZMAKTEN KURTULABILIRZ
        
        interface ICount {
    age:number | null;
}
const Hello:React.FC<IProps> = ({name,description="Defatul description",label,onSmthHappen}) => {
        const [count, setCount]=useState<number | string | null | undefined>(1453);
        const [myCount,setMyCount]=useState<ICount>({age:33})

        type Count={
    age:number | null;
}

interface ICount {
    age:number | null;
}
const Hello:React.FC<IProps> = ({name,description="Defatul description",label,onSmthHappen}) => {
        const [count, setCount]=useState<number | string | null | undefined>(1453);
        const [myCount,setMyCount]=useState<Count>({age:33})

            
        //USE REF KULLANIMI....
        HOVER YONTEMI ILE HANGI TIPIN GELECEGINI EVENT LERDE VE 
        //USE REF DE BULUYORUZ
        const inputRef=useRef<HTMLInputElement>(null);
        //Once gidip html elementi icinde ici bos bir obje olarak birakip uzerine gidince tipi gelecek...
  return (
    <div>
    <h2>Hello- {name}{description}</h2> 
    <h3>{onSmthHappen(name)}</h3>
{/*ref in tipii yine eventlerdeki hover teknigi ile uzerine gelerek ordan tipini alacagiz
(property) React.ClassAttributes<HTMLInputElement>.ref?: React.LegacyRef<HTMLInputElement> | undefined
*/
/*}
    <input type="text" ref={inputRef} />

       const divRef=useRef<HTMLDivElement>(null);
  return (
   
    /*(property) React.ClassAttributes<HTMLDivElement>.ref?: React.LegacyRef<HTMLDivElement> | undefinedhtml div element gelecek tip olarak*/ 
   /* <div ref={divRef}> 


    const btnRef=useRef<HTMLButtonElement>(null);
  return (
  /*    {/*(property) React.ClassAttributes<HTMLButtonElement>.ref?: React.LegacyRef<HTMLButtonElement> | undefined 
        <button ref={btnRef}></button>

        USERREDUCER A BAKALIM...

        interface Note {
    content:string;
}
Action icinde ya boyle bir obje ya da boyle bir obje alacak diyoruz
cunku sadece add ve remove islemi olacak note lar ile ilgili
type Actions={type:"add", content:string} | {type:"remove", id:number};
type State=Note[];
const NotesReducer=(state:State, action:Actions)=>{
    switch (action.type) {
        case "add":
            return [...state, {content:action.content}];
        case "remove":
            return state.filter((x,i)=>action.id!==i);//remove da action objesi geliyor icinde id var

        default:
            return [...state];
    }
}
const Hello:React.FC<IProps> = ({name,description="Defatul description",label,onSmthHappen}) => {
    const [notes,dispatch]=useReducer(NotesReducer,[]);

    {/*Auto-complete avantaji sagliyor ve bize hangi tip girmemiz gerektigi soylyor
(property) React.DOMAttributes<HTMLButtonElement>.onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
Handler kullanma yoksa hata aliyoruz...
 *//*}/*
 <button onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>dispatch({
    type:"add",
    content:"My-Note"
 })}></button>
</div>
*/