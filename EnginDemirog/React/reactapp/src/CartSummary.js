import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink

} from "reactstrap";
import {Link} from 'react-router-dom';

function CartSummary(props) {
  console.log("cartsummaryprops:_", props);
  const { cart } = props;
  const renderSummary=()=>{
        return(
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Your Cart
            </DropdownToggle>
            <DropdownMenu right>
              {cart.map((cartProduct) => {
                const { product, quantity } = cartProduct;
                return (
                  <DropdownItem key={product.id}>
                    <Badge color="danger" onClick={(e)=>props.removeFromCart(product)} >Remove</Badge>  
                    {product.productName}
                    <Badge color="success">{quantity}</Badge>
                  </DropdownItem>
                );
              })}
              <DropdownItem divider />
              <DropdownItem>
              <Link to="cart">Go to cart</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
  }
  const renderEmptyCart=()=>{
      return(
          <NavItem>
              <NavLink>
                  Empty Cart
              </NavLink>
          </NavItem>
      )
  }
  return (
    <div>
     {cart.length>0 ? renderSummary() : renderEmptyCart()}
    </div>
  );
}
export default CartSummary;
/*
 <div>
     {renderSummary()}
    </div>
    Kendi yazdigimiz fonksiyon u biz normal her zamanki yaptgimiz sekilde calistiririz jsx icinde ama eventhanglingler ile yazarken onune parantez koymadan calisitiriyoruz o fonksiyonari
    onClick={changeCategory} eger parametre almiyorsa paramtre alirsa onClick={(e)=>changeCategory(item)} seklinde calistiririz jsx icerisinde
    Birde biz jsx icinde return ustunde de bir fonksiyon icinde jsx formati yazabiliriz ve icerisine yine jsx e ait html elementi gorunmmunde olan jsx elementleri kullanabiliriz bunun icin de fonksiyonu jsx formatinda bir return ile donmemiz gerekecektir
    const renderSummary=()=>{
        return(

        )
    }  seklinde
 */