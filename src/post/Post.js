import React from 'react'
import "./Post.css";
import i11 from '../avator.PNG'



function Post({ username, caption, imageUrl }) {
  return (
    <div className='post'>
     
     <div className='post__header'>
     <span><img src={i11} width="50" /></span>
      <span><b>{username}</b></span>
      </div>
      <img src={imageUrl} className='img'/>
      <h4 className='txt'><strong>{username}</strong> {caption}</h4>

    </div>
  )
}

export default Post
