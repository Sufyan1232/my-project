
import React, { useState, useEffect } from 'react'
import './App.css';
import your from './you1.PNG'
import Post from './post/Post';
 import { db , auth } from './firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageUpload from './ImageUpload/ImageUpload';
import Uname from './Uname';
import Search from './pages/Search';
import avat from './img/avatr.png'
import Person from './Person';

export default function Test() {
    const [show, setShow] = useState(false);  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    //this is where the code run
db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc => ({
   id: doc.id, 
   post: doc.data()
   
  }
  
   )));
   
})

  },

  
  []);


// useEffect(()=>{
//           db.collection("posts")
//           .doc("60HYixOc3KmHMXJsMqma")
//           .get()
//           .then((snapshot)=>{
//             if(snapshot){
//               setPosts(snapshot.data());
//             }
//           })
// console.log(posts);
// },[])



  const signUp = (event) =>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setShow(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <>
    <div className='onemore'>

      <div className='white'>
      <div className='App'>
      
      

      <div >
      <Modal show={show} onHide={handleClose} className='sign__form'>   
        <Modal.Header closeButton>
        <center><img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-10.jpg" className="img1"/></center>
        <h5>REGISTER USER</h5>
        </Modal.Header>
        <Modal.Body >
          <form className='app__signup'>
            <input
            className='inp'
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input 
            placeholder="email"
            className='inp'
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
             <input 
            placeholder="password"
            className='inp'
            type="text"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <Button className='inbtn' variant="light" type='submit' onClick={signUp}>Sign up</Button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={openSignIn} onHide={() => setOpenSignIn(false)} className='sign__form'>   
      <center>
      <div className='sign_up'>
        <Modal.Header >
        <img width="10px" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-10.jpg" className="img1"/>
         <br />
          <h5>LOGIN</h5>
        </Modal.Header>
        </div>
        <div className='modal_body'>
        <Modal.Body >
          <form className='app__signup'>
           
         
           <center>
           <span><img width="30px" src='https://img.freepik.com/free-icon/user_318-481573.jpg?w=360'/></span>
            <input
            
           placeholder="email"
            className='inp'
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <br />
            <span><img width="30px" src=' https://i.pinimg.com/originals/ba/dd/08/badd08ad2cfb4eb9169f07bf88e4e9c6.jpg'/></span>
             <input 
            placeholder="password"
            className='inp'
            type="text"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            </center>
            <Button className='inbtn' variant="light" type='submit' onClick={signIn}>Sign In</Button>
          
          </form>
        </Modal.Body>
        </div>
        </center>
      </Modal>
      </div>
      <div className='bakimg'>
        
        <div className='header'>
    <div className='your'>
    <img src='https://st.depositphotos.com/36058524/52230/v/600/depositphotos_522307606-stock-illustration-little-boy-listening-music-headphones.jpg' width="40px" />
      Yourfolio</div>     
          {/* <img src={your} className="img1"/> */}
          {user ? (
           <Button variant="light" onClick={() => auth.signOut()}>Logout</Button>
        ): (
        <div className='app__loginContainer'>
          <Button variant="light" onClick={() => setOpenSignIn(true)}> Sign In</Button>
          <Button variant="light" onClick={handleShow}> Sign Up</Button>
          </div>
        )}
        </div>
        </div>
      <button className='btn'>Popular</button><button className='sbtn'>Recommanded</button><button className='btn'>Extream</button>
        {/* {user=== user && <Search />} */}
       
        <div className='right'>
      <div className='app__posts'>
      {
      posts.map(({id, post}) => (
      <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
       ))
      }
      </div>
      <div className='left'>
        <center>
         <img src={avat} width="90px"/>
         <div><h2>{user?.displayName}</h2></div>
         <h6>test@gmail.com</h6>
         <br />
         <br />
         <div><span className='space'>4 year experices</span><img src='https://fluttergems.dev/media-cards/image_stack.png' width="140px"/></div>
         <div><span className='space'>5 different skills</span><img src='https://raw.githubusercontent.com/skyrbe/stacked-avatars/HEAD/readme_images/default_styles.png' width="140px"/></div>
         <div><span className='space'>lot of project</span> <img src='https://www.shutterstock.com/image-vector/vector-illustration-personal-profile-pictures-260nw-2116811405.jpg' width="160px"/></div>
         </center>
         </div>
      </div>
      <Person />

{/* <h1>{posts.username}</h1> */}
      


{user?.displayName ? (
               <ImageUpload username={user.displayName} />
        ): (
          <h3>Sorry you need to login to upload</h3>
        )}
      
    </div>
    </div>
    </div>
    </>
  );
}


