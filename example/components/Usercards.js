import React, { useEffect, useState } from "react";
import Usercard from "./Usercard";

import { PaginationAnimated, PaginationSwipeable } from '../../src/index';

import CustomNavigation, { CustomNavigationUsercards } from "./CustomNavigation";

import './usercards.css'

const Usercards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setusers] = useState([]);

  const [visibleUsers, setVisibleUsers] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const handleDelete = (id) => {
    let usersFiltered = [...users.filter((p) => p.id !== id)];

    setusers((users) => [...usersFiltered]);
  };

  const handleFilter = (e) => {
    setSearchItem(e.target.value);
  }

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
            let workingUsers = [...users];
            for (let i = 0; i < 10; i++) {
              workingUsers[i].imgURL = `https://picsum.photos/id/100${i}/200/300`
            }
            setusers([...workingUsers]);
            setVisibleUsers([...workingUsers]);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    fetchusers();
  }, []);

  useEffect(() => {
    if (searchItem) {
      console.log(searchItem)
      let workingArray = users.filter(u => u.name.toLowerCase().includes(searchItem.toLowerCase()));
      setVisibleUsers(vu => [...workingArray]);
    } else {
      setVisibleUsers(vu => [...users]);
    }
  }, [searchItem]);

  return (
    <div className="showcase">
      <h1 style={{textAlign: 'center'}}>Usercards</h1>
      <h2 style={{textAlign: 'center'}}>A searchable set of usercards with custom animation</h2>

      <input
        type="text"
        placeholder='Type a name, e.g. "Clementine"'
        onChange={e => handleFilter(e)}
        value={searchItem}
      />
      {isLoading && users.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <PaginationSwipeable
          topNav={true}
          itemsOnPage={1}
          infiniteScroll={true}
          items={visibleUsers}
          cloneKey="user"
          customNavigation={CustomNavigationUsercards}
          customNextAnimation={'nextPageCustom 1s forwards'}
          customPrevAnimation={'prevPageCustom 1s forwards'}
          delay={300}
          children={<Usercard handleDelete={handleDelete} />}
        />
      )}
    </div>
  );
}


export default Usercards;