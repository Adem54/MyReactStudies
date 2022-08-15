import React from 'react'
import Product from './Product'
import { useFetch } from '../../9-custom-hooks/final/2-useFetch'
// import defaultImage from '../../../assets/default-image.jpeg';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-prop-types-example'
/*
[
    {
        "id": "recmg2a1ctaEJNZhu",
        "name": "utopia sofa",
        "image": {
            "url": "https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg"
        },
        "price": 39.95
    },
*/

const Index = () => {
  const { products } = useFetch(url)
  return (
    <div>
      <h2>products</h2>
      {/* <img src={defaultImage} /> */}
      <section className='products'>
        {products.map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </section>
    </div>
  )
}

export default Index
