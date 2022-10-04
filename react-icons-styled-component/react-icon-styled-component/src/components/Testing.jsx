import React from 'react'
import styled from "styled-components";


const Testing = () => {
  return (
    <Wrapper>
        <div className="colors">
        <span>Good afternoon adem</span>
          <div>This is my second div</div>
        </div>
       <article className="article">
        <p>This is article</p>
       </article>
      
      <h3>Hello</h3>
      <p>hello people</p>
      <button>Click me</button>
    </Wrapper>
  )
}

/*
Simdi biz Wrapper stylec.section icinde bir .colors isminde className girersek o className
colors className i Wrapper a nested olarak yazacagimz herhangi bir elemente ait olacaktir
Wrapper in kendisine ait olmaz onu bilelim cunkiu Wrapper in kendisin e direk css yazmak istersek
dogrudan en uste yazariz ki biz dogrudan Wrapper in kendisi icin style css yazdgimz zaman
birde o yazdgimz css ler i icinde yazmasi icin uniq bir class daha olusturur arkada ve onlarin
altinda yazar bizim Wrapper in kendisi icin yazdigmz css leri yani 2 tane ayri ayri 
uniq className olusturmus oluyor birisi dogrudan Wrapper i styled.section la olusturdugmz anda 
geliyor biriisi de Wrapper in styled.section icine direk margin-top:2rem; gibi bir kod yazdigmz zamn
olusturularak onlari olusturulan uniq className altinda topluyor
Ayrica .colors ismind e olusturdgumz className i biz div elemnti olusturup ona verdik
ve o colors class i ni kullandigmz div elemnti icinde kullanacagimz elemntler icinde yine css yazabiliyoruz

Biz global class olarak kullanmak istedgimz class lari ne yapariz gidip index.css de genel olan yerde
yazariz ve sonra onlari gidip direk istedigmz yerlerde kullaniriz ama her componentin kendine ozel yazacgimz classlar
ve css leri ise styled.comnponent araciligi ile o componentin kendi icinde yazabilirz

Bu arada sunu da cok iyi anlayalim, bizim yazdgimzi Wrapper styled.componenti hicbirsekilde gidip de 
Testing componentini fonksiyonalitesini etkilemiyor
*/


const Wrapper=styled.section`
margin-top:2rem;
background-color:yellow;
.colors {
    display:grid;
    grid-template-columns:125px 1fr;
    align-items:center;
    margin-bottom:1rem;
    background-color:orange;
  
    span {
        text-transform:capitalize;
        font-weight:700;
        background-color:blue;
    }
   
}

p {
    font-size:2rem;
}
.article {
    background-color:green;

p{
    border:2px solid;
    width:50%;
    background-color:pink;
}
}

p {
    background-color:gray;
}
/* 
BUNU BILMEK ONEMLIIDIR....
Burda suna dikkat edelim biz Sass da yazdigmz gibi bu sekilde nested olarak p elemntine
style yazdiktan sonra gelip direk Wrapper altinda p elementlerine style yazarsak o zaman hangisi once olacak
Wrapper elementi altina yazdigmiz p elemnti icine yazdigmi style lar override edecek bizim .articel icine yazdigmiz
p elementinini style larini cakisma durumunda yani ayni ozellikleri kullanma durumunda cunku devreye spesifity girer hangisi'
buyukse o gecerli olacaktir, tabi ki .wrapperinuniqclassi.article p{ } ile .wrapperinuniqclassi p{} cakisir ve buyuk olan
yani article icindeki p ye yazilan kodlar gecerli olur bu durumda, bu tarz cakismalarda inspect ten olayi daha iyi anlayabilirz
Nested selection lari cok fazla kullanmasak da olur, hover falan yazacagimz zaman ayni nested selection i birdaha yazmamiz gerekecek

*/



div {
    display:flex;
    background-color:lightblue;
}


h3{
    color:red;
}



button {
    border:2px dashed;
}
`;

export default Testing

/*
styled.component kullanarak, bir component olusturacagiz
Wrapper olusturuyoruz section elementi ile ve bu ana elemntimiz oluyor Testing
componentimizin ve de biz bu componentimizin icerisinde diger elementleri ornegin
h3 elementi, bir p elementi ve bir button elementi kullanabilirken, sonra da gelip 
Wrapper in styled.section icerisidne bu elementlere style css yazabiliyoruz ayni
normal css icinde nasil yaziyorsak o sekilde yazabiliyoruz
ayrica da yine Wrapper in styled.section icerisinde class olusturup icine
style css ler yazip o class i Wrapper a nestede olan elemntlerden istedgimzde kullanabilirz

BURAYI IYI ANLAYALIM...STYLED COMPONENTIN BIZE GETIRILERINDEN BIRISI
Simdi bize ozellikle bu sekilde kullanmamizin bir faydasi da sudur bunu iyi anlayalim
biz normalde Wrapper yerine gidip dogrudan section da yazabilirdik oraya bu is bize sunu katti
biz const Wrapper=styled.section``;  yazdigmiz zaman o arkada section elemnti olusturup icerisine
uniq bir class name atamasi yapiyor dolayisi ile Wrapper elementimiz section elemnti ile
uniq bir className ile olusturuldugu icin baska section lar ile karismasi onlarla cakisma 
ihtimali olmuyor normalde gidip direk section olarak kullanirsak o zaman bu tarz cakismalar olacaktir

Ayrica tabi her componente ait style i gidip de onun kendi icinde kullanarak biryerde toplayip
bir suru css kodu ust uste yigmaktan kurtulmus oluyoruz..
*/
