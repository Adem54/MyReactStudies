import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {MDBModal,MDBModalDialog,MDBModalContent} from "mdb-react-ui-kit";
const LoadingRedirect = () => {
    const [count,setCount]=useState(5);
    const navigate=useNavigate();
  //Bu component bir kulliici token i olmadan, authenticate olmadan, direk url adresi uzerinden eger dashboard sayfasina girmek isterse onu bu sayfada karsilayip, bu sekilde bir kullanici deneyimi sunmus olacagiz... BU DA FARKLI BIR BAKIS ACISI..
  useEffect(()=>{
const interval=setInterval(()=>{
    setCount((currentCount)=>currentCount-1)
},1000)
count === 0 && navigate("/auth");

return ()=>clearInterval(interval);
  },[count,navigate])
    return (
    <div className="vh-100 gradient-custom">
      <MDBModal show={true}>
        <MDBModalDialog centered>
            <MDBModalContent>
                <p className="mt-3">Redirecting you in {count} sec</p>
            </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default LoadingRedirect