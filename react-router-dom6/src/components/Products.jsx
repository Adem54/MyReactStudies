import React from 'react';
import { Link } from 'react-router-dom';

const products=[
    {id:1,name:"Pc",desc:"There are a lot of good functionalities in our product.."},
    {id:2,name:"Mobil phone",desc:". It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {id:3,name:"IPad",desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
    {id:4,name:"Smartclock",desc:" Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."},
    {id:5,name:"TV",desc:"The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."},
]
const Products = () => {
  return (
    <div>
   
{products.map(({id,name})=>(
    <>
    <h5>{name}</h5>
      <span>  <Link key={id} to={`/products/${id}`}>Read More</Link></span>
    </>

))}


     {/* <Routes>
        <Route  path="productdetail" element={<ProductDetail/>}/>
        <Route  path="productcategory" element={<ProductCategory/>}/>
     </Routes>
     
     App.tsx icinde    {/* <Route path="products/*" element={<Products/>}/> } 
    eger products path olarak bu sekilde tanimlansa idi bu su demekti Products compoenti
    icinde Routes, Route lar ile biz yeni componentler tanimlayabilirz, yani bir grup component
    var  products componenti altinda demek olurdu
     */}
    </div>
  )
}

export default Products
