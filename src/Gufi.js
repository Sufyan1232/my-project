import React, { useState, useEffect } from 'react'
// import './App.css';
import your from './you1.PNG'
// import Dpost from './dpost/Dpost';
 import { db , auth } from './firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageUpload from './ImageUpload/ImageUpload';
import Dpost from './dpost/Dpost';
import Detail from './detail/Detail';
import Person from './Person';
import Uname from './Uname';


export default function Test() {
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

  useEffect(() => {
    //this is where the code run
db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
  setDposts(snapshot.docs.map(doc => ({
   id: doc.id, 
   dpost: doc.data()
  }
   )));
})
  },
  
  []);

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
      
      <div className='App'>
      
     

      <div >
      <Modal show={show} onHide={handleClose} className='sign__form'>   
        <Modal.Header closeButton>
        <center><img src={your} className="img1"/></center>
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
            <Button variant="light" type='submit' onClick={signUp}>Sign up</Button>
          
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={openSignIn} onHide={() => setOpenSignIn(false)} className='sign__form'>   
        <Modal.Header closeButton>
        <center><img src={your} className="img1"/></center>
        </Modal.Header>
        <Modal.Body >
          <form className='app__signup'>
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
            <Button variant="light" type='submit' onClick={signIn}>Sign In</Button>
          
          </form>
        </Modal.Body>
      </Modal>
      </div>
      <div className='bakimg'>
{/* 
    {! user && 
    <>
    
    </>
    } */}


        <div className='header'>
    <div className='your'>Yourfolio</div>     
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
       
       {/* {user && <Uname />} */}
       <br />
       {user?.displayName}

          
      <div className='app__posts'>
      {
        dposts.map(({id, dpost}) => (
            <Dpost key={id} username={dpost.username} detail={dpost.detail} imageUrl={dpost.imageUrl} />
        ))
      }
      </div>

{user?.displayName ? (
               <Detail username={user.displayName} />
        ): (
          <h3>Sorry you need to login to upload</h3>
        )}
        
    </div>
    </>
  );
}







// import React, { useState, useEffect } from 'react'
// // import './App.css';
// import your from './you1.PNG'
// // import Dpost from './dpost/Dpost';
//  import { db , auth } from './firebase';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ImageUpload from './ImageUpload/ImageUpload';
// import Dpost from './dpost/Dpost';
// import Detail from './detail/Detail';


// export default function Test() {
//     const [show, setShow] = useState(false);  

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const [dposts, setDposts] = useState([]);
//     const [openSignIn, setOpenSignIn] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [user, setUser] = useState(null);

//   useEffect(() => {
//    const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if(authUser) {
//         //user has logged in..
//         console.log(authUser);
//         setUser(authUser);
//       } else {
//         // user has logout
//         setUser(null);
//       }
//     })

//     return () => {
//       unsubscribe();
//     }

//   }, [user, username]);

//   useEffect(() => {
//     //this is where the code run
// db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
//   setDposts(snapshot.docs.map(doc => ({
//    id: doc.id, 
//    dpost: doc.data()
//   }
//    )));
// })
//   },
  
//   []);

//   const signUp = (event) =>{
//     event.preventDefault();

//     auth.createUserWithEmailAndPassword(email, password)
//     .then((authUser) => {
//       return authUser.user.updateProfile({
//         displayName: username
//       })
//     })
//     .catch((error) => alert(error.message))

//     setShow(false);
//   }

//   const signIn = (event) => {
//     event.preventDefault();
//     auth.signInWithEmailAndPassword(email, password)
//     .catch((error) => alert(error.message))

//     setOpenSignIn(false);
//   }

//   return (
//     <>
      
//       <div className='App'>
      
      

//       <div >
//       <Modal show={show} onHide={handleClose} className='sign__form'>   
//         <Modal.Header closeButton>
//         <center><img src={your} className="img1"/></center>
//         </Modal.Header>
//         <Modal.Body >
//           <form className='app__signup'>
//             <input
//             className='inp'
//             type="text"
//             placeholder="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             />
//             <input 
//             placeholder="email"
//             className='inp'
//             type="text"
//             value={email}
//             onChange={(e)=> setEmail(e.target.value)}
//             />
//              <input 
//             placeholder="password"
//             className='inp'
//             type="text"
//             value={password}
//             onChange={(e)=> setPassword(e.target.value)}
//             />
//             <Button variant="light" type='submit' onClick={signUp}>Sign up</Button>
          
//           </form>
//         </Modal.Body>
//       </Modal>
//       <Modal show={openSignIn} onHide={() => setOpenSignIn(false)} className='sign__form'>   
//         <Modal.Header closeButton>
//         <center><img src={your} className="img1"/></center>
//         </Modal.Header>
//         <Modal.Body >
//           <form className='app__signup'>
//             <input 
//             placeholder="email"
//             className='inp'
//             type="text"
//             value={email}
//             onChange={(e)=> setEmail(e.target.value)}
//             />
//              <input 
//             placeholder="password"
//             className='inp'
//             type="text"
//             value={password}
//             onChange={(e)=> setPassword(e.target.value)}
//             />
//             <Button variant="light" type='submit' onClick={signIn}>Sign In</Button>
          
//           </form>
//         </Modal.Body>
//       </Modal>
//       </div>
//       <div className='bakimg'>
//         <div className='header'>
//     <div className='your'>Yourfolio</div>     
//           {/* <img src={your} className="img1"/> */}
//           {user ? (
//            <Button variant="light" onClick={() => auth.signOut()}>Logout</Button>
//         ): (
//         <div className='app__loginContainer'>
//           <Button variant="light" onClick={() => setOpenSignIn(true)}> Sign In</Button>
//           <Button variant="light" onClick={handleShow}> Sign Up</Button>
//           </div>
//         )}
//         </div>
//         </div>
       
//       <div className='app__posts'>
//       {
//         dposts.map(({id, dpost}) => (
//             <Dpost key={id} username={dpost.username} detail={dpost.detail} imageUrl={dpost.imageUrl} />
//         ))
//       }
//       </div>

// {user?.displayName ? (
//                <Detail username={user.displayName} />
//         ): (
//           <h3>Sorry you need to login to upload</h3>
//         )}
        
//     </div>
//     </>
//   );
// }