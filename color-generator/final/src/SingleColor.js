import React, { useState, useEffect } from 'react'
 import rgbToHex from './utils'

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  console.log("rgb, weight, index, hexColor:  ",rgb, weight, index, hexColor);
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(',')//rgb:[255,255,255]
  //rgb yi de her bir kutunun background- unda kullanabilmek icin join ile diziden 
  //cikarip normal parantez icinde css icinde kullanilacak hale getiriyoruz
  console.log("bcg",bcg);//(255,255,255)
   const hex = rgbToHex(...rgb)
   //hexColor:ffffff,000000, renklerin # konulmamis halider ve # ile birlikte hexColor value
   // si oluyor zaten ondan dolayi da # ile birlestirip kopyalanacak hale getiriyoruz
  const hexValue = `#${hexColor}`
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])
  return (
    <article
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true)
        console.log("hexValue::::: ", hexValue);
        navigator.clipboard.writeText(hexValue)//hexValue yi kopyalama islemini  yapar
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {/*alert ekrana kopyalandi mesaji verip o mesaji 2 saniye kalmasin saglamak icin uygulaniyor */}
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
