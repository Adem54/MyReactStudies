import React from 'react'
import {Table,Button} from 'reactstrap';

 function CartList(props) {
console.log("CartList: ",props.cart.product)
    const renderCart=()=>{
        return(
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>CategoryId</th>
                        <th>ProductName</th>
                        <th>Unit Price</th>
                        <th>Unit In Stock</th>
                        <th>Quantity</th>
                    </tr>
                    
                </thead>
            <tbody>
                {
                    props.cart.map(productItem=>{
                        return(
                                <tr  key={productItem.product.id}>
                                    <td>{productItem.product.id}</td>
                                    <td>{productItem.product.categoryId}</td>
                                    <td>{productItem.product.productName}</td>
                                    <td>{productItem.product.unitPrice}</td>
                                    <td>{productItem.product.unitsInStock}</td>
                                    <td>{productItem.quantity}</td>
                                    <td> <Button color="danger" onClick={(e)=>props.removeFromCart(productItem.product)} >Remove</Button>    </td>
                                </tr>
                        )
                    })
                    
                }
            </tbody>
            </Table>
        )
    }
    return (
        <div>
     {renderCart()}
        </div>
    )
}
export default CartList;