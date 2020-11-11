import React from "react";

const Post = ({ post, handleDelete }) => {
  const deletePost = () => {
    handleDelete(post.id);
  };
  return (
    <div className="post" onDoubleClick={deletePost}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
