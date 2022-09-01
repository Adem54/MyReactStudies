import React from 'react'

const PaginationButton:React.FC<PaginationButtonProps> = ({pagesArray,setPage,page}) => {

  return (
    <>
     {pagesArray?.map((item:number)=>{
        return <button
        className={item===page? 'active':''}
        key={item}
        onClick={()=>setPage(item)}
        >{item}</button>
     })} 
    </>
  )
}

interface PaginationButtonProps{
    page:number,
    pagesArray:number[];
    setPage:React.Dispatch<React.SetStateAction<number>>;
}

PaginationButton.defaultProps={
    pagesArray:[] as number[],
}

export default PaginationButton
