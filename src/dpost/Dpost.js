import React from 'react'
 import "./Dpost.css";
import i11 from '../avator.PNG'



function Dpost({ username, caption, imageUrl }) {
  return (
    <div className='Dpost'>
     
     <div className='dpost1'>
     {/* <span><img src={i11} width="50" /></span> */}
      <span><b>{username}</b></span>
      </div>
      <img src={imageUrl} className='img'/>
      <h6><strong>Detail :- </strong> {caption}</h6>

    </div>
  )
}

export default Dpost