import React from "react";

import "./usercard.css";

const Usercard = ({ user, handleDelete }) => {
  const deleteUser = () => {
    handleDelete(user.id);
  };
  return (
    <div className="usercard">
      <img src={user.imgURL} className="usercard__img"/>
      <div className="usercard__info">
        <h4>name</h4>
        <div>{user.name}</div>
        <h4>username</h4>
        <div>{user.username}</div>
        <h4>email</h4>
        <div>{user.email}</div>
      </div>
      <button className="usercard__removeUserBtn" onClick={deleteUser}>
        Remove user
      </button>
    </div>
  );
};

export default Usercard;