import React from 'react'
const colors=[{id:1,title:"pink"},{id:2,title:"purple"},{id:1,title:"orange"},{id:1,title:"blue"},{id:1,title:"green"}]
const AddNote = () => {

  const chooseColor=(title)=>{
    console.log("title :", title)
  }
  return (
    <div>
      <h2>AddNote</h2>
      <div style={{position:"relative",  width:"600px", margin:"auto", }}>
        <textarea style={{width:"100%",border:"none",boxShadow:"0px 0px 4px 1px rgba(0,0,0,0.49)"}}  name="note" id="note" cols="60" rows="10">

        </textarea>
          <div style={{position:"absolute",  width:"100%" ,bottom:0, left:0,display:"flex", justifyContent:"space-between",  }}>  
          <div style={{display:"flex"}}>
           {
             colors.map((color,index)=>{
              
               const {title:colorTitle}=color;
               console.log("colorTitle: ", colorTitle);
              return    <div style={{  marginLeft:`${index ? '2px' :'10px' }`    ,marginBottom:"10px", width:"30px",cursor:"pointer" ,height:"30px", borderRadius:"50%"  , backgroundColor:`${colorTitle}`,}} key={index}
              onClick={()=>chooseColor(colorTitle)}
              >   </div>
             }
            
             )
           }
            </div>
          <button style={{height:"30px", backgroundColor:"greenyellow", border:"none", borderRadius:"5px",padding:"0 15px",cursor:"pointer"}}>AddNew</button>
           </div>
      </div>
    </div>
  )
}

export default AddNote