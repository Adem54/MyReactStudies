import React from 'react'
import styles from "./styles.module.css";
console.log(`A: `,styles);//  {title: 'styles_title__NvmCT'}
const index = () => {
  return (
    // <div className="title">A</div>
    <div className={styles.header}>A</div>
  )
}

export default index;