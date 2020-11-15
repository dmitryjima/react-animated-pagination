import React, { useEffect, useState } from "react";

import Post from "./Post";

import './showCase.css';

import { PaginationAnimated, PaginationSwipeable } from '../../src/index'
import CustomNavigation from "./CustomNavigation";
import SwitchBtn, { ToggleBtn } from "./SwitchBtn";
import Slider from "./Slider";
import PostEditor from "./PostEditor";
import CodeDiv from "./CodeDiv";
import LoadingSpinner from "./LoadingSpinner";

const Posts = () => {

  // Conrols-specific state
  const [paginationType, setPaginationType] = useState('PaginationSwipeable');
  const [infiniteFlip, setinfiniteFlip] = useState(false);
  const [bottomNav, setBottomNav] = useState(true);
  const [topNav, setTopNav] = useState(true);
  const [typeOfNavigation, setTypeOfNavigation] = useState('standard')
  const [itemsOnPage, setItemsOnPage] = useState(10);

  // Data-specific state
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleDelete = (id) => {
    let postsFiltered = [...posts.filter((p) => p.id !== id)];

    setPosts((posts) => [...postsFiltered]);
  };

  const handleAddPost = (post) => {
    let workingArray = [...posts];

    workingArray.unshift(post);

    setPosts(posts => [...workingArray]);
  }

  const handleSavePost = (post) => {
    let workingArray = [...posts];
    let index = workingArray.findIndex(p => p.id === post.id);
    workingArray[index] = {...post}
    setPosts(posts => [...workingArray]);
  }

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
      <h1 style={{textAlign: 'center'}}>Posts</h1>
      <h2 style={{textAlign: 'center'}}>A dynamic list of posts with handlers</h2>
      <div className="showcase__controlsDiv">
        <div style={{width: '100%', textAlign: 'center'}}>
          PaginationAnimated <ToggleBtn active={paginationType === 'PaginationSwipeable' ? true : false} onChange={() => setPaginationType(paginationType === 'PaginationSwipeable' ? 'PaginationAnimated' : 'PaginationSwipeable')} /> PaginationSwipeable
        </div>     
        <div style={{width: '48%', textAlign: 'center'}}>
        Bottom navigation <SwitchBtn active={bottomNav} onChange={() => setBottomNav(bottomNav ? false : true)}/>
        </div>
        <div style={{width: '48%', textAlign: 'center'}}>
        Top navigation <SwitchBtn active={topNav} onChange={() => setTopNav(topNav ? false : true)}/>
        </div>  
        <div style={{width: '48%', textAlign: 'center'}}>
        Custom Navigation <SwitchBtn active={typeOfNavigation === 'custom'} onChange={() => setTypeOfNavigation(typeOfNavigation === 'custom' ? 'standart' : 'custom')}/>
        </div> 
        <div style={{width: '48%', textAlign: 'center', opacity: paginationType !== 'PaginationSwipeable' ? '.5' : '1'}}>
          Infinite Flip <SwitchBtn disabled={paginationType !== 'PaginationSwipeable'} active={infiniteFlip} onChange={() => setinfiniteFlip(infiniteFlip ? false : true)}/>
        </div> 
        <div style={{width: '100%', textAlign: 'center'}}>
          Items on page: <Slider onChange={(value) => setItemsOnPage(value)} value={itemsOnPage}/>
        </div>
      </div>
      <CodeDiv
      content={
`<${paginationType}${paginationType === 'PaginationSwipeable' ? `\n  infiniteFlip={${infiniteFlip}}` : ''}
  bottomNav={${bottomNav ? true : false}}
  topNav={${topNav ? true : false}}${typeOfNavigation === 'custom' ? `\n  customNavigation={CustomNavigation}` : ''}
  itemsOnPage={${itemsOnPage}}
  items={posts}
  entryProp="post"
  iterationKey="id"
  children={
    <Post 
      handleDelete={handleDelete} 
      handleSaveChanges={handleSavePost} 
    />
  }
/>`
}
      />
      <div className="showcase__showcaseDiv">
      {isLoading && posts.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <>
        <h3 style={{textAlign: 'center'}}>Add a new post</h3>
        <PostEditor
          post={{}}
          handleSaveChanges={handleAddPost}
        />
        {
        paginationType === 'PaginationSwipeable'
        ?
        <PaginationSwipeable
          bottomNav={bottomNav}
          topNav={topNav}
          itemsOnPage={itemsOnPage}
          items={posts}
          infiniteFlip={infiniteFlip}
          iterationKey={'id'}
          entryProp="post"
          customNavigation={typeOfNavigation === "custom" ? CustomNavigation : null}
          children={<Post handleDelete={handleDelete} handleSaveChanges={handleSavePost} />}
        />
        :
        <PaginationAnimated
        bottomNav={bottomNav}
        topNav={topNav}
        itemsOnPage={itemsOnPage}
        items={posts}
        iterationKey={'id'}
        entryProp="post"
        customNavigation={typeOfNavigation === "custom" ? CustomNavigation : null}
        children={<Post handleDelete={handleDelete} handleSaveChanges={handleSavePost}  />}
      />
      }
      </>
      )}
      </div>
    </div>
  );
}


export default Posts;
