import React, { useEffect } from "react";

const SingleProduct = ({ fields, addToCart }) => {
    let { name, price } = fields
    price = price / 100
    const image = fields.image[0].url
  
    useEffect(() => {
      console.count('hello from product');
    });

    return (
      <article className='product'>
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>${price}</p>
        <button onClick={addToCart}>add to cart</button>
      </article>
    )
  }

  export default SingleProduct;
