
import React from 'react'
import PropTypes from "prop-types";

//Gonderilen props obje icinde gelir dolayisi ile biz de gonderilen prop u kullanmak icin ya prop verip prop.name ya da bu sekilde direk, aliriz
const User = ({name,surname,departman,isLoggedIn,age,friends,address}) => {
   //buraya obje olarak gonderiliyor parametreye geliyor obje olarak

   if(!isLoggedIn){
       return <div>Giris yapmadiniz</div>
   }
   const {title,zip}=address;
  return (
      <>
    <div>
          <h2>{isLoggedIn ?  `Benim adim ${name} soyadim ${surname} ve  yasim ${age} ve de alanim ${departman} dir`: "Giris yapmadiniz"}   </h2>
          <h3>{`${title} - ${zip}`}</h3>
          <ul>
          {friends.map(({name,id},index)=>{
              return <li style={{color:"red", listStyle:'none'}} key={id}> {name} </li>
          })}
          </ul>
       
    </div>
    </>
  )
}

//Prop larin type larini belirleme
//Bizim componentlerimizi baskalari da kullanacagini varsayar isek biz props larda hangi veri tipi kullanacagimizi onceden belirtmemiz kullaniciyi dogru yonlendirme acisindan guzel bir bestpracatise dir iste bu islemi biz PropTypes uzerinden yapabiliriz
User.propTypes={
    name:PropTypes.string,//artik name e string disinda bir deger girilirse hata alacagiz...
    //Warning: Failed prop type: Invalid prop `name` of type `boolean` supplied to `User`, expected `string`.
    surname:PropTypes.string.isRequired,
    isLoggedIn:PropTypes.bool,
    age:PropTypes.number,
    departman:PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    friends:PropTypes.array.isRequired,
    address:PropTypes.shape({
        title:PropTypes.string,
        zip:PropTypes.number
    })
}

//Artik-Eger props degeri gonderilirse hicbirsekilde default props degerine bakilmaz ama gonderilmez ise o zaman defult props degerine bakilacak
User.defaultProps={
    name:"Nameless",
    isLoggedIn:false,

}
export default User