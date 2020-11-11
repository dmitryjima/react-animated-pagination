import React, { useEffect, useState } from "react";
import Usercard from "./Usercard";

import { PaginationAnimated, PaginationSwipeable } from '../../src/index';

import CustomNavigation from "./CustomNavigation";

import './usercards.css'

const Usercards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setusers] = useState([]);

  const handleDelete = (id) => {
    let usersFiltered = [...users.filter((p) => p.id !== id)];

    setusers((users) => [...usersFiltered]);
  };

  useEffect(() => {
    const fetchusers = () => {
        setIsLoading(true);

        fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "GET"
          }
        )
        .then((res) => res.json())
        .then(users => {
            setusers([...users]);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    fetchusers();
  }, []);

  return (
    <div className="usercards">
      <h1>React Simple Pagination</h1>
      <h2>This pagination is dynamically created</h2>
      {isLoading && users.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <PaginationSwipeable
          bottomNav={true}
          topNav={true}
          itemsOnPage={1}
          infiniteScroll={true}
          items={users}
          cloneKey="user"
          customNavigation={CustomNavigation}
          children={<Usercard handleDelete={handleDelete} />}
        />
      )}
    </div>
  );
}


export default Usercards;