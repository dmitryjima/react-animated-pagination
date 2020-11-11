import React, { useEffect, useState, useRef } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/styles/prism';

import Post from "./Post";

import './showCase.css';

import { PaginationAnimated, PaginationSwipeable } from '../../src/index'
import CustomNavigation from "./CustomNavigation";
import CopyBtn from "./CopyBtn";
import SwitchBtn, { ToggleBtn } from "./SwitchBtn";
import Slider from "./Slider";

const Posts = () => {
  let codeRef = useRef(null);

  const handleCopyToClipBoard = () => {
    navigator && navigator.clipboard.writeText(codeRef.current.firstChild.textContent)
      .then(() => {
        console.log('Copied!');
        console.log(codeRef.current.firstChild.textContent);
      })
      .catch(err => console.log(err))
  }

  const [paginationType, setPaginationType] = useState('PaginationSwipeable');
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [bottomNav, setBottomNav] = useState(true);
  const [topNav, setTopNav] = useState(true);
  const [typeOfNavigation, setTypeOfNavigation] = useState('standard')
  const [itemsOnPage, setItemsOnPage] = useState(10);

  // Data-specific
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleDelete = (id) => {
    let postsFiltered = [...posts.filter((p) => p.id !== id)];

    setPosts((posts) => [...postsFiltered]);
  };

  useEffect(() => {
    const fetchPosts = () => {
        setIsLoading(true);

        fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "GET"
          }
        )
        .then((res) => res.json())
        .then(posts => {
          console.log(posts)
            setPosts([...posts]);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    fetchPosts();
  }, []);

  return (
    <div className="showcase">
      <h1>Posts</h1>
      <h2>A list of posts with handlers and commmon state</h2>
      <div className="showcase__controlsDiv">
        <div>
          PaginationAnimated <ToggleBtn active={paginationType === 'PaginationSwipeable' ? true : false} onChange={() => setPaginationType(paginationType === 'PaginationSwipeable' ? 'PaginationAnimated' : 'PaginationSwipeable')} /> PaginationSwipeable
        </div>
        {
          paginationType === 'PaginationSwipeable'
          ?
          <div>
            Infinite Scroll <SwitchBtn active={infiniteScroll} onChange={() => setInfiniteScroll(infiniteScroll ? false : true)}/>
          </div>
          :
          null
        }            
        <div>
        Bottom navigation <SwitchBtn active={bottomNav} onChange={() => setBottomNav(bottomNav ? false : true)}/>
        </div>
        <div>
        Top navigation <SwitchBtn active={topNav} onChange={() => setTopNav(topNav ? false : true)}/>
        </div>
        <div>
        Custom Navigation <SwitchBtn active={typeOfNavigation === 'custom'} onChange={() => setTypeOfNavigation(typeOfNavigation === 'custom' ? 'standart' : 'custom')}/>
        </div>   
        <div>
          Items on page: <Slider onChange={(value) => setItemsOnPage(value)} value={itemsOnPage}/>
        </div>
      </div>
      <div ref={codeRef} className="showcase__codeDiv">
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {
`<${paginationType}${paginationType === 'PaginationSwipeable' ? `\n  infiniteScroll={${infiniteScroll}}` : ''}
  bottomNav={${bottomNav ? true : false}}
  topNav={${topNav ? true : false}}${typeOfNavigation === 'custom' ? `\n  customNavigation={CustomNavigation}` : ''}
  itemsOnPage={${itemsOnPage}}
  items={posts}
  cloneKey="post"
  iterationKey="id"
  children={<Post handleDelete={handleDelete} />}
/>`
          }
        </SyntaxHighlighter>
        <CopyBtn
          handleCopyToClipBoard={handleCopyToClipBoard}
        />
      </div>
      <div className="showcase__showcaseDiv">
      {isLoading && posts.length === 0 ? (
        <div>Loading...</div>
      ) : (
        paginationType === 'PaginationSwipeable'
        ?
        <PaginationSwipeable
          bottomNav={bottomNav}
          topNav={topNav}
          itemsOnPage={itemsOnPage}
          items={posts}
          infiniteScroll={infiniteScroll}
          iterationKey={'id'}
          cloneKey="post"
          customNavigation={typeOfNavigation === "custom" ? CustomNavigation : null}
          children={<Post handleDelete={handleDelete} />}
        />
        :
        <PaginationAnimated
        bottomNav={bottomNav}
        topNav={topNav}
        itemsOnPage={itemsOnPage}
        items={posts}
        iterationKey={'id'}
        cloneKey="post"
        customNavigation={typeOfNavigation === "custom" ? CustomNavigation : null}
        children={<Post handleDelete={handleDelete} />}
      />
      )}
      </div>
    </div>
  );
}


export default Posts;
