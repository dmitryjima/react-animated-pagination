import React, { useState } from "react";
import PostEditor from "./PostEditor";

import './post.css';

const Post = ({ post, handleDelete, handleSaveChanges }) => {
  const [isEdited, setIsEdited] = useState(false);

  const deletePost = () => {
    handleDelete(post.id);
  };
  return (
    <>
    {
      !isEdited
      ?
      <div className="post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div className="post__btnsDiv">
        <button
          onClick={() => setIsEdited(true)}
        >
          Edit
        </button>
        <button
          onClick={deletePost}
        >
          Delete
        </button>
        </div>
      </div>
      :
      <PostEditor
        post={post}
        handleSaveChanges={handleSaveChanges}
        handleCancel={() => setIsEdited(false)}
      />
    }
    </>
  );
};

export default Post;
