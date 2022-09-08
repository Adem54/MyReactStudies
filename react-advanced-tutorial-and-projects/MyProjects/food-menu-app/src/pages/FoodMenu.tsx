import { MenuType } from "../model/menu.model";
import Food from "./Food";
import Loading from "./Loading";


const FoodMenu = (props:foodMenuProps) => {
  const {menu,isLoading}=props;
  return (
  
    <>
    {isLoading ? <Loading/> : menu?.map(item=>{
      return  <Food key={item.id} {...item}  />
    })}
 
     
    </>

  )
}

interface foodMenuProps {
  menu?:MenuType[];
  isLoading:boolean;
}

//menu dizisi nin data gelene kadar undefined gelmesi durumundan dolayi biz typescriptte hata alacagiz burda o hatayi 2 sekilde cozeriz
//1-props icinde gelen menu datasini optioanl yapariz yani haci sen bunu gondermesen de sknti yok bunu optional yaptim dersin ya da
//2-props icin biz default deger beliritrizi ki gelmedigi zaman o deger kullanilir ve yine hatanin onune gecilmis olunur
// FoodMenu.defaultProps={
//   menu:[] as MenuType[],
// }
export default FoodMenu

/*
ASAGIDAKI ORNEKLERIN HEPSINI KULLANACAK ORNEKLER YAPALIM...
Redux-toolkit yaklasimlari
1-createSlice icersinde name,initialState,reducers,extrareducers ve o sayfada axios ile isteklerin gonderilip sonucunda gelen datalar in extrareducers 
prepare kullanma,
addCase diye de kullaniriz, yoksa direk fonksiyon ismini yazarak da kullanabilirz..

icinde lokal de tutulan state e aktarilip o lokal state uzerinden kullanicya gosterilmesi, sunulmasi
2-Create slice-entity adapter ile, data nin cok daha hizli alinmasi sagalaniyor ve bu, cok daha zekice datalari alip bize gelen CRUD fonksionlarini
da kolayi kullandiriyor
3-RTK-query ile api islemleri ve gelen datayi aliriz ama, ayrica da crateSlice ile bir slicemiz olur, kendi lokalmize de gelecek olan datayi aliriz
4-RTK-query ile Create-entity-adapter i kullanilan ornekler mevcuttur...
*/