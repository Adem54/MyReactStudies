
import styled from "styled-components";
//styled yerine baska isimlendirme de verilebilir ama genel isimlnedirme bu sekildedir bundan
//sapmamak gerekir

//props gecilebiliyor bu sekilde, ve boylece, hem farkli tasarim hem de condition durumlarina gore de
//design degistirilebilmis oluyor
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// `` template literals dir ve javascript ten geliyor
//Bi aslinda bir fonksiyondur ve biz saece hangi, html elementi olugunu beliritp
//o elemente ait style lari yaziyoruz icerisine
//Bizim ayrica gidip react componenti olusturmamiza gerek yok, biz styled-compnentler ile zaten
//react-componentlerimizi olusturuyoruz..
//Yani bizim react-componentlerimizi styled-component olusurmus olacak css leri ile birlikte
//Ornegin biz, bir container olusturacaksak yani diger tum elementleri kapsayacak olan
//bir element seklinde bir component olusturacaksak o zaman da ona gore css ozellikleri verecegiz
//styled-componentler icerisinde biz, normal jsx div,h2 gibi jsx ler de kullanabiliriz 

//styled-compnentlerimizde className leri nasil kullaniriz?
//Biz ornegin Container sytled-componetimiz e nested olarak kullanilan diger styled componentler veya
//normal jsx ler icindeki herseye erisebiliyoruz orngin Container icindeki div e ait hero class i icine
//Container styled-componenti icinde style yazaccagiz..
//styled-component mantigi html-dom da su sekildedir..her bir farkli tanimlanan styled-componente
//dom tarafinda, html tarafinda uniq bir class ataniyor ve bizim burda  yazdigmz css kodlari gidip
//o class icerisinde yaziliyor arkada, dolayisi ile de herhangi bir cakisma yasanmiyor bu sekilde, ayni ozelliklere
//sahip Container, bir de Container2 yapiyoruz hicbirsekilde cakisma yasanmiyor
//Bizim ornegin bir Conteiner styled-componenti icinde, ona nested durumda olan tum elementere erisebiliyor onlarin
//class larina da css  yazabiliyoruz onun icinde dolayisi ile biz Container icerisinde ona nested olacak elementlerde
//kullanilabilecek class lar yazip, onlari defalarca nested olan diger componentlerde de kullanabiliriz
//Bu ozellikle buyuk prjelerde bizim icin ekstra onemli, reusability ye her alanda, css,react,redux vs hepsinde
//reusability mantiginda ilerlemeliyiz, ki ozellkle buyuk projelerde class lar uzerinde ilerlemek cok daha kreatif 
//oluyor

const Container=styled.main`
display:flex;
justify-content:center;
aling-items:center;
background-color:cyan;
border:1px solid;
.hero{/* div icinddki className e Container icinde css degeri verebiliyoruz */
  color:yellow;
}
`;


const Container2=styled.main`
display:flex;
justify-content:center;
aling-items:center;
background-color:cyan;
border:1px solid;
.hero{/* div icinddki className e Container icinde css degeri verebiliyoruz */
  color:yellow;
}
`;

const Header=styled.header`
width:5rem;
height:5rem;
background-color:green;


`;
const Parag=styled.p`
color:red;
font-size:2rem;

`;

import React from 'react'

const MyButton = () => {
  return (
    <div>
       <Button>Normal</Button>
    <Button primary>Primary</Button>
    <Parag>
      Hello, there. My name is Adem
    </Parag>

    <Container>
      <Header className="hero">Header</Header>
      <div className="hero">You are the hero! </div>
    </Container>

    <Container2>
      <Header>Header</Header>
      <div className="hero">You are the hero! </div>
    </Container2>
    
    
    </div>
  )
}

export default MyButton
