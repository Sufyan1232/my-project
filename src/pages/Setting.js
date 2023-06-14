import ImageUpload from '../ImageUpload/ImageUpload'
import React, { useState, useEffect } from 'react'
import {auth} from "../firebase"
import Uname from '../Uname';
import "./Profile.css";

function Setting() {
  

const [user, setUser] = useState(null);
const [username, setUsername] = useState('');

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged((authUser) => {
  if(authUser) {
    //user has logged in..
    console.log(authUser);
    setUser(authUser);
  } else {
    // user has logout
    setUser(null);
  }
})

return () => {
  unsubscribe();
}

}, [user, username]);

  return (
    <div className='display'>
        <div>
        <Uname />
        </div>
    <br/>
       <div>
        {user?.displayName ? (
           <ImageUpload username={user.displayName} />
        ): (
        <h3>Sorry you need to login to upload</h3>
        )}
      </div>
    <br />
    <br />
   
  </div>
  )
}

export default Setting
