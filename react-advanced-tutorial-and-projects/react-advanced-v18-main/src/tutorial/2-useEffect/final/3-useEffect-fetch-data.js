import React, { useState, useEffect } from 'react';

const url = 'https://api.github.com/users';
// second argument

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    // console.log(users);
  };

  /* useEffect icerisinde, eger biz, async-await islem yapacak isek o zaman
  o islemi disarda bir fonksiyonda 
  yapariz ve o fonksiyonu useEffect 
  icerisidne invoke ederiz */

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <h3>github users</h3>
      <ul className='users'>
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>profile</a>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UseEffectFetchData;
