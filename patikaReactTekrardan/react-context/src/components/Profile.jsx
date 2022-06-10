import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogin = () => {
    setTimeout(() => {
      setUser({ id: 1, username: "adem54", bio: "lorem ipsum" })
    }, 2000);
  };
  return (
    <div>
        <button onClick={handleLogin}>Login!</button>
      <br />
      <code>{JSON.stringify(user)}</code>
    </div>
  );
};
export default Profile;
