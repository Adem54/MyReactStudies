import React from 'react'
import { useSelector } from 'react-redux';

const ProfileComponent = () => {
    const user=useSelector(state=>state.loginReducer.login);//state ana store dur bunlarin altinda store.js de slice lardan hangi reducer isminde yaznus isek store un veya ana state altinda o isimle olstugu icin componentlerde useSelector ile alirken o isimle alaagiz....

    const theme=useSelector(state=>state.themeReducer.theme);
    console.log("user: ",user)
  return (
    <div style={{color:theme}}>
<h1>ProfileComponent</h1>
<p>Name: {user.name}</p>
<p>Surname: {user.surname} </p>
    </div>
  )
}

export default ProfileComponent