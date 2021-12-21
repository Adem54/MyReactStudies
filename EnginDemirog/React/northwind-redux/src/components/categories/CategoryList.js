import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem,Badge } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

function CategoryList(props) {
  //useEffect i calistirdgimiz zaman uygulamamiz acilgigi anda categories stateitimiz degismis oluyor
  useEffect(() => {
    //Action lari da biz hangi action olaymimiz ile calistirack isek onun altinda calistiririz ve o da props un altina actions objesi ve actions objesinin icinde biz hangi property ismi ile cagirdi isek aksiyonu o isimle gelecektir.....
    props.actions.getCategories(); //Uygulamamiz acildiginda, componentlerimiz mount edilirken yerlesirken render isleminden once burasi calisacagi icin categoriesleri render isleminden once alalim ki biz gormek istegimizde karsimiza getirebilelim
  }, []); //componentDidMount u taklit ediyoruz
  //Burda veriyi kullanirken state ile baglanti yapildiginda biz veriyi hangi propertyu ismi ile yazdi isek props un altina o isim ile gelecektir

  const selectCategory = (category) => {
    props.actions.changeCategory(category);
    props.actions.getProducts(category.id);
  };

  return (
    <div>
      <h3> <Badge color="warning">Categories</Badge></h3>
      {props.categories.map((category) => (
        <ListGroup key={category.id}>
          <ListGroupItem
            active={category.id === props.currentCategory.id}
            onClick={(e) => selectCategory(category)}
          >
            {" "}
            {category.categoryName}{" "}
          </ListGroupItem>
        </ListGroup>
      ))}
     
    </div>
  );
}
//Burda parametreye gelen state baglandgimiz store daki tum state mekanizmamizdir...
//currentCategory diye bir obje nesnemiz var bizim onu state nesnesindeki changeCategoryReducer a bagla demek
//Bizim store umuz icinde yani state olarak gelen parametre icinde reducer lar  vardir neden cunku state donduruyor bunlar, bize ne lazim ise o reducer ile baglanti kurmamiz gerekecek.
//Dikkat edelim state bizim store umuz gibi dusunelim ve burdan biz state lerer erisecegiz bize return olarak state donduren fonksiyonlarimiz nerde idi tabi ki reducer icerisinde changeCategoryReducer ismindeki fonksiyonlari gibi fonksiyonlar idi bunlar o zaman bizim state  uzerinden bizim ihtiyacimiz olan islemi yani eventi yani fonskiyonu action i uygulayip, guncelleyip return eden reducer fonksiyonumu hangisi ise biz burdas state den onu cagiririz.....Cok kritik bilgi...
const mapStateToProps = (state) => {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer, //bunu yaparak categories state imizi de baglamis oluyoruz
  };
};
//map et yani bagla belirleyecegimiz bir state i bu compoonentlerimizin propsuna bagla

//COMPONENTIMIZI DIREK AKSIYONA-ACTION A BAGLAMA VE ACTION I DISPATCH ILE HAREKET GECIRME
//Bu sistemin actionlari, bu componentin actionlari diyoruz, ve redux taki actionlari buraya baglayacagiz....ve getCategories isminde bir aksiyonumuz olacak redux taki askiyonumuz olan getCategories i buraya baglayacagiz cunku biz o aksiyonu harekete gecirmeliyiz ki diger redux a gidecek olan fonksiyon(getCategoriesSuccess) da zaten bu fonksiyonun calismasina bagli olarak calisacak
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(
        productActions.getProducts,
        dispatch
      ),

    },
  };
}
//Demekki ben reducer a state i direk de baglayabiliyorum reducer dan =>mapStateToProps
//Ben aksiyonu da baglayabiliyorum actionCategory den=>mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
//Bizim secili kategoriyi tanimlamamiz gerekiyor, normalde redux kullanmadan once biz bunu en ustte App de tanimladik, fonksiyonuda en ustte olusturduk ve fonksiyondan veri donecek sekilde ayarladik ve fonksiyonuda gelip yine burda calistirmistik...
