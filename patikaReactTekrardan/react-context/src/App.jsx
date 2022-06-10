import './App.css'
import Container from './components/Container';
import {ThemeProvider} from './context/ThemeContext';
import {UserProvider} from './context/UserContext';
//import ettigmiz ThemeContext in altinda Provider adinda bir tanim var be ne is yapiyor bu datayi saglamak ta gorev yapiyor yani icerisinde kalan tum, componentlere icindeki datayi gonderme islemin yapacak...
//Amacimiz su Button componentinden ThemeContext.Provider icindeki veriye nasil erisecegiz..
//1-Oncelikle kullanmak istedigmiz componentlerin hepsine Context leri dahil etmemiz gerekir
//import ThemeContext from "../context/ThemeContext";
//2-Sonra bu context i kullanmak icin react in altindaki useContext ifadesini react altindan import ederek kullanacagiz..
//const data=useContext(ThemeContext);
//console.log("data: ",data);//artik ThemeContext in props olarak gonderilen dataya erisebiliyoruz
//O zaman biz hangi componentte ThemeContext i import edip useContext parametresinde de kullandigimiz zaman ThemeContext icindeki dataya tum componentlerimizden erisebilirz demektir tabi Provider in sarmalaadigi tum componentlerimizden 
//Daha pratik kullanim icin biz App.js de kullandigmiz Provider i da Context e tasiyabiliriz...
//Bu sekilde yaparak context ile yazacagimiz herseyi Context dosyamz icine yazmis oluyoruz....
//Bu arada, biz daha fleksibel kullanmak ve style tanimlarini daha kolay yapabilmek icin ThemeProvider ile sarmaladimgiz tum componentleri bir tane ortak component olusturup onun icerisine atabiliriz ve o componenti burda ThemeProvider e sarmalattirabiliriz...
function App() {
  return (
    <div>
      <ThemeProvider>
        <UserProvider>
      <Container />
      </UserProvider>
      </ThemeProvider>
    </div>
  )//Su durumda UserProvider da ThemeProvider icindeki datayi kullanabilir durumdadir..
}
export default App;
