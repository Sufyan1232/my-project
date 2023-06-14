import React, { useState, useEffect } from 'react'
import {auth, db } from '../firebase';
import Post from '../post/Post';
import Uname from '../Uname';
import "./Profile.css";

function Search() {
  const [show, setShow] = useState(false);  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dposts, setDposts] = useState([]);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

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

  const [posts, setPosts] = useState([]);

    useEffect(() => {
        //this is where the code run
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
       id: doc.id, 
       post: doc.data()
      }
       )));
    })
      },
      
      []);



  return (
    <div>
      Search
    <div className='search'>
       <form>
        <input type="box" />
        <button>Search</button>
        </form>
        </div>
      <br />
      <br />

      <div>
        <div className='psearch'>
      {
      posts.map(({id, post}) => (
      <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
       ))
      }
      </div>
   {user?.displayName ? (
   <Uname username={user.displayName} />
  
 ): (
 <h3>Sorry you need to login to update</h3>
 )}
   
      </div>
      </div>
  )
}

export default Search

// {user?.displayName ? (username={dpost.username} caption={dpost.detail}
//   <Uname username={user.displayName} />
  
// ): (
// <h3>Sorry you need to login to update</h3>
// )}

// </div>
// </div>
// )
// }https://e7.pngegg.com/pngimages/364/97/png-clipart-purple-silk-ribbon-floating-material-purple-silk.png
//http://www.clker.com/cliparts/9/P/Y/1/T/B/purple-ribbons-hi.png