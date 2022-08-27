import React from 'react'
import { MenuType } from '../model/menu.model'
import { formatCurrency } from '../utilities/currentFormat'
import { makeFirstLettersUpper } from '../utilities/firstLetterUpper'

const Food = ({title,category,price,img,desc}:MenuType) => {
  return (
    <section className="food-box">
    <figure className="figure">
      <img className="img" src={img} alt="pancake"/>
    </figure>
    <article className="article">
      <section className="title-price">
          <h4 className="title">{makeFirstLettersUpper(title)}</h4>
          <h4 className="price"> {formatCurrency(price)}</h4>     
      </section>
     <p className="dot"></p>
      <p className="desc">
    {desc}
      </p>
    </article>
  </section>
  )
}



export default Food