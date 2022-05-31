import React from "react";
import { Table,Button } from "reactstrap";

function ProductList(props) {
 
  const { info,addProductToCard } = props;
  const { products } = props.products;
console.log("productProps: ",props);

  return (
    <div>
      <h3>
        {info.title}-{props.currentCategory.categoryName}
      </h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ProductName</th>
            {/* <th>CateoryName</th> */}
            <th>UnitPrice</th>
            <th>Quantity Per Unit</th>
            <th>Units In Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td> {product.productName}</td>
                {/* <td>  {props.currentCategory.categoryName}</td> */}
                <td> {product.unitPrice}</td>
                <td> {product.quantityPerUnit}</td>
                <td> {product.unitsInStock}</td>
                <td>
                <Button onClick={(e)=>addProductToCard(product)} color="info">AddToCard</Button>  
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default ProductList;
/*
         <tbody>

        {   products.filter(data=>data.categoryId===props.currentCategory.categoryId).map(data=>{
            console.log("productFilteredData: ",data);
            return  ( 
          <tr
          key={data.id}
          >
            <th scope="row">{data.id}</th>
            <td>  {data.productName}</td>
            <td>  {data.unitPrice}</td>
            <td>  {data.quantityPerUnit}</td>
            <td>  {data.unitsInStock }</td>
           
          </tr>
          )  }  )}
          
        </tbody>
*/
