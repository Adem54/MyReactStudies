import React, { useEffect, useState } from "react";
//Biz users componentimiz mount edildigi anda datayi compoenentimize veriyi almak istiyoruz tabi bunu useeffect ile yapacagiz...
//Bunu hep bu sekilde kullanaagiz dikkat edelim...
const Users = () => {
  const [users, setUsers] = useState([]);
  //Component acilir acilmaz yukleme islemi baslayacagi icin true ile baslar
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    // .then(res=>res.json())
    // .then(users=>{
    //     setUsers([...users,users])
    //     setIsLoading(false);
    // })
    // .catch(e=>console.log(e))
//Yukardaki gibi de olur asagidaki gibi de ....
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) =>  setUsers([...users, users]))
      .catch((e) => console.log(e))
      .finally(()=>setIsLoading(false))

    console.log(`users: `, users);
  }, []);
  return (
    <div>
      <div>{isLoading && "Loading..."}</div>
      <ul>
        {users.map(({ id, name }, index) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
