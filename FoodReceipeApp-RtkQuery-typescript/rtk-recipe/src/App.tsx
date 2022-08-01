import "./App.css";
import { useGetRecipesMutation } from "./services/recipeApi";
import { useEffect, useState } from "react";
import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";


const styleApp={
  margin:"auot",
  padding:"15px",
  maxWidth:"1000px",
  alignContent:"center"
}

const options=[
  {
    label:"Vegan",
    value:"vegan"
  },
  {
    label:"Vegetarian",
    value:"vegetarian"
  },
  {
    label:"Paleo",
    value:"paleo"
  },
  {
    label:"Dairy Free",
    value:"dairy-free"
  },
  {
    label:"Low Sugar",
    value:"low-sugar"
  },
  {
    label:"Egg Free",
    value:"egg-free"
  },

]

function App() {
  const [value, setValue] = useState("");
  //value,setValue input icinde kullanicinin girdigi data dir
  //query ise value ye girilen data yi biz query ye alarak, daha ozgurce kullanabilmeyi sagliyoruz...bu iste harika bir mantik...

  const [query, setQuery] = useState("");
  const [health, setHealth] = useState("vegan"); //default olarak vegan veriyoruz
  const [show, setShow] = useState(false);
  const [recipe,setRecipe]=useState({});
  console.log("recipe: ", recipe);

  //Simdi burda suna dikkat edelim, isLoading, data bunlari hazir getiriyor rtk-query u onu guclu yapiyor
  //birde mutation olark islem yaptimizda isLoading,data yi da bu sekilde alabiliyruz
  const [getRecipes, {isLoading,data}] = useGetRecipesMutation();

  useEffect(() => {
    getFoodRecipes();
  }, [query,health]);//Kullanici ne zaman ki, query ve health i degistirirse ki o da buttona tiklayinca, degistirecegiz ondan dolayi da 
  //kullanici inputa aramak istedigi food kelimesini yazacak, sonra, butona tiklayacak ve o zaman sayfa render edilip yeni bir request gonderecek ve
  //url de kullaniciinin yazdigi kelime aranacak, useEffect ile her button tiklanmasinda eger kullanicinin girdigi data degismis ise 
  //render et ve request gonder diyoruz o zaman useEffect tetiklensin istiyoruz
  
  if(isLoading)return <Spinner/>
  
  //Dikkat edelim async-await  li bir islemi useEffect disinda yapip useEffect icinde sadece invoke ettik 
  //Bestpractise...cook onemli, bu sekilde kullanmaliiyiz...
  const getFoodRecipes=async()=>{
    await getRecipes({query,health})//dikkat edelim bu parametreleri girmemiz gerekecek
  }
  //Datayi aldik dikkt edelim, redux-devtools dan inceleyebiliriz, datayi aldik, comonent mount-olur olmaz datayi aldik

  //BU COOK HARIKA  BIR BESTPRACTISE...
  //Dogrudan, ornegin bir input icinden verilen datayi, url e gondermek yerine, setQuery uzerinden islemi yapiyoru bunu cok gormemistim onceden....
  //Butona tiklaninca, input taki value yi setQuery  ye gonderiyor, zaten query nin her degismesinde de useEffect tetiklenecek sekilde ayarladigi icin
  //orda da useEffect tetiklenip yeni bir search sorgusu yapmis oluyor....
  //Burasi butona tiklaniinca arama yaptiriyor...
  //setQuery de ne yapyor value degerini query ye atamis oluyor ve de query yi de useEffect icinde degistigi zaman useEffectin tetiklnmesi saglandigi icin
  //dolayisi ile, butona tiklaninca inputa girilen data, setQuery ile, query state tine ataniyor...ve de useEffecti tetikleyerek icindeki, search endpointi
  //calisiyor...
  const handleSearch=()=>{
    setQuery(value);//url de aranacak datayi, input icine girilecek olan, value den alarak ne girildi ise url e onu gonderiyor...
    setValue("");
  }

  //SelectOptions da bu sekilde type veriliyor event e....
  const handleClick=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setHealth(e.target.value);
    //Select-optioan kullanim mantigi....
    //Kullanicinin tikladigi e.target.value ile bizim health state timize atanir yani biz kullanicinin sectigi datayi state e alarak o datayi kontrol altina aliyoruz ki onu istedgimz yerde kullanabilelim nitekim, select icerisine value attributune atayarak kullanabilmis oluyoruz.... ve healt
    // state timizde her zaman select icindeki value ye verilir , select options da isler her zaman bu sekilde ilerler.....onemli....
  }

  const toggleShow=(recipe:any)=>{
    setShow(!show);
    setRecipe(recipe);
  }
  //BESTPRACTISE.....COOK GUZEL BIR YONTEM....
  //Yahu zaten Card icinde biz recipe datasini gosteriyoruz kullaniciya, burda da toggleShow denildiginde setRecipe
  // icine Card icerisinde yazdirdigmiz recipe yi setRecipe ile alarak, artik dogrudan ana datanin ornegin ana objenn iki altinda olan datayi ordan cekip cikarip istedgimiz gibi istedigmiz yerde kullanabilmeyi sagliyoruz iste burda yapilan veya cikarilacak ders budur....


  return (
    <div className="App" style={styleApp}>
     <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
      <MDBNavbarBrand className="text-center">
      <h5 className="fw-bold mt-2">😋 Food Recipe App</h5>
      </MDBNavbarBrand>
      </MDBContainer>
     </MDBNavbar>
     <div className="row g-1 align-items-center mt-2">
      <MDBInput
      wrapperClass="col-auto"
      label="Search Receipe"
      type="text"
      value={value}
      onChange={(e)=>setValue(e.target.value)}
      />
      <div className="col-auto">
        <MDBBtn onClick={handleSearch}>Search</MDBBtn>
        </div>
        <div className="col-auto">
          <select className="categoryDropdown" onChange={handleClick} value={health}>
            {options.map((option:any, index)=>( 
              <option key={index} value={option.value || ""}>{option.label}</option>
            ))}
          </select>
        </div>
     </div>
     <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      {data?.hits?.map((item:any,index:number)=>{
        return <Card toggleShow={toggleShow} key={index} recipe={item.recipe}/>
      })}
      {/* data && data.hits && data.hits.map() ile {data?.hits?.map() bu ayni seydir objeler icinde gelecek olan api den geldigi icin
       ilk basta obje olmayacagi icin undefined ile patlatacak uygulamayi ondan dolayi da bu sekilde cozum uretilir....
        */}
     </MDBRow>
     {show && (
      <Modal 
      show={show}
      setShow={setShow}
      toggleShow={toggleShow}
      recipe={recipe}
      />
     )}
    </div>
  );
}

export default App;

//BU MANTIK COK KULLANILIYOR VE COK KULLANILACAK....COOOK ONEMLI BESTPRCTISE...

//NOT:Eger biz bir butona tikliyorsak ve orda yeni bir endpoint i tetikleyerek ornegin bir urune tikliyoruz ve urun detayina gidiyor isek o zaman
//biz, o tikladigmiz urunun id sini endpoint url si icinde kullaniyoruz ve yeni bir get request yapiyoruz demektir veya, bir search isleminde eger biz
//bir input a bir deger giriyoruz ve girdigmiz degere gore, farkli datalar, geliyor ise, ve de url de ona gore degisiyor ise o zaman demekki bizim
//girdigmz deger dinamik olarak endpoint url ine koyulmus ve biz ne girersek endpointe onu yaziyor ve o endpoint eger arkada bizim girdimgz deger
//ile ilgili o enpoint olusturulmus ise tetikleniyor ki bu tarz durumlarda zaten biz deger girmeyiz biz select-option ile bize belle secenekler sectirilir ve
//bu seceneklerde, api de karsiligi olan secenklrdir ve biz ne secersek o url icine dinamik olarak kullanilacak ve, de api-endpointi ne request bizim
//sectimiz option a gore secilecek..
