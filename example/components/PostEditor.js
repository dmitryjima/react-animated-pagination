import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import './post.css';

const PostEditor = ({ post, handleCancel, handleSaveChanges }) => {
  const [postInEdit, setPostInEdit] = useState({...post});

  const handleTitleChange = e => {
      let workingPost = {...postInEdit};
      workingPost.title = e.target.value;
      setPostInEdit({...workingPost})
  }

  const handleBodyChange = e => {
    let workingPost = {...postInEdit};
    workingPost.body = e.target.value;
    setPostInEdit({...workingPost})
}

  const handleSave = () => {
    if (!postInEdit.id) postInEdit.id = uuidv4();
    handleSaveChanges(postInEdit);

    post.title !== undefined
    ?
    handleCancel()
    :
    setPostInEdit({title: '', body: ''})
  };
  return (
      <div className="post">
        <input 
            type="text"
            value={postInEdit.title}
            onChange={handleTitleChange}
            placeholder="Post title"
        />    
        <textarea 
            type="text"
            value={postInEdit.body}
            onChange={handleBodyChange}
            placeholder="Post body"
        />
        <div className="post__btnsDiv">
        <button
          onClick={() => handleSave(postInEdit)}
          disabled={!postInEdit.title ? true : false}
        >
          Save
        </button>
        <button
          onClick={() => {
              post.title 
              ?
              handleCancel()
              :
              setPostInEdit({title: '', body: ''})
          }}
        >
            {
                post.title
                ?
                'Cancel'
                :
                'Clear'
            }
        </button>
        </div>
      </div>
  );
};

export default PostEditor;
