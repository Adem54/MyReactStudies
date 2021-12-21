import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import {Link} from 'react-router-dom';

function CartSummary(props) {
const removeFromCart=(product)=>{
    props.actions.removeFromCart(product);
    alertify.error(product.productName + " sepetten silindi!");
}

  const renderSummary = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepetiniz
        </DropdownToggle>
        <DropdownMenu right>
          {props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}> 
             <Badge onClick={e=>removeFromCart(cartItem.product)} color="danger">Remove</Badge>
            {cartItem.product.productName} 
            <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
          <Link to="cart">Go to cart</Link> 
            </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  //ilk acildiginda sepetiniz bos yazsin, eklendigi anda da elemanlar gelsin
  //sepet boskenki operasyonu yazalim
  const renderEmpty = () => {
    return (
      <NavItem>
        <NavLink>Sepetiniz bos</NavLink>
      </NavItem>
    );
  };
  return <div>{props.cart.length > 0 ? renderSummary() : renderEmpty()}</div>;
}
const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

const mapDispatchToProps=(dispatch)=>{
    return {
        actions:{
            removeFromCart:bindActionCreators(cartActions.removeFromCart,dispatch)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);
