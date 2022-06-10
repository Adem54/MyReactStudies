import React from 'react'

const SearchContact = ({searchText,setSearchText}) => {
    
  return (
    <>
    <div>
       <input style={{width:'300px', height:'25px'}} placeholder="search-contact"
       value={searchText}
       onChange={(e)=>{setSearchText(e.target.value)}}
       />   
    </div>
    </>
  )
}

export default SearchContact