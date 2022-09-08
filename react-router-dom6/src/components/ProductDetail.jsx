import React from 'react'
import { useParams } from 'react-router-dom'
const products=[
    {id:1,name:"Pc",desc:"There are a lot of good functionalities in our product.."},
    {id:2,name:"Mobil phone",desc:". It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {id:3,name:"IPad",desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
    {id:4,name:"Smartclock",desc:" Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."},
    {id:5,name:"TV",desc:"The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."},
]
const ProductDetail = () => {
    const {productId}=useParams();
    console.log(typeof productId);//string
    //Bu onemli, burda gelen id yi number a cevirmemiz
    //gereken zamanlar olacak
    const product=products.find(item=>item.id===Number(productId));
  return (
    <div>
        <h2>ProductDetail - {productId}</h2>
        ProductName: <h5>{product.name}</h5>
        ProductDesc: <h5>{product.desc}</h5>
        
        </div>
  )
}

export default ProductDetail