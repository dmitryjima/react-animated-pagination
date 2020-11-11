import React from "react";

import "./usercard.css";

const Usercard = ({ user, handleDelete }) => {
  const deleteUser = () => {
    handleDelete(user.id);
  };
  return (
    <div className="usercard" onDoubleClick={deleteUser}>
      <h3>{user.name}</h3>
      <h3>{user.username}</h3>
      <img src={`https://picsum.photos/200/300?random=${Math.random() * 10}`} />
    </div>
  );
};

export default Usercard;