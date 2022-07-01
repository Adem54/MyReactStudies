import { CountryType } from "../types";

interface ICountryProps {
    country:CountryType;
}
 //countries props a gonderilecek, ve biz onu burda type ini olusturup
 //type ina gore alip nasil kullanacagiz ona bakalim
 //props:ICountryProps diye tanimlayabiliriz ama Country componenti children aliyorsa
 //yani <Country></Country> ve eger Country icersinde children alirsak bu childrena
 //props icinden aliyoruz ama bu sekildde kullanirsak, children a erisemeyecegiz
//children a props altindan erisecegiz....
//Sunu biliyoruz her component key ve children alabilir
//Bizim cozumumuz su olacak, burda Country componentinin kendisine biz tip atayacagiz...
const Country:React.FC<ICountryProps> = (props) => {
    const {country}=props;
    return (
               <p>{country.name.common}-- {country.capital}</p>
    );
};
export default Country;