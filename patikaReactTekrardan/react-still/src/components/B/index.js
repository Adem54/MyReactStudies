import React from 'react'
import styles from "./styles.module.css";
console.log(`B: `,styles);//B:  {title: 'styles_title__5d645'}
const index = () => {
  return (
    // <div className="title">B</div>
    <div className={styles.header}>B</div>
  )
}

export default index