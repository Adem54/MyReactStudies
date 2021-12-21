import React from 'react'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions";
import {Table,Button} from "reactstrap";
import alertify from "alertifyjs";


 function CartDetail(props) {

    const removeFromCart=(product)=>{
        props.actions.removeFromCart(product);
        alertify.error(product.productName + " sepetten silindi!");
    }
    
    return (
       
        <div>
  <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ProductName</th>
            <th>UnitPrice</th>
            <th>Quantity Per Unit</th>
            <th>Units In Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((cartItem) => {
            return (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td> {cartItem.product.productName}</td>
                <td> {cartItem.product.unitPrice}</td>
                <td> {cartItem.quantity}</td>
                <td> {cartItem.product.unitsInStock}</td>
                <td>
                  <Button onClick={e=>removeFromCart(cartItem.product)}  color="danger">Remove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
        </div>
      
    )
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
  export default connect(mapStateToProps,mapDispatchToProps)(CartDetail);