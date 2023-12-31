import Button from 'react-bootstrap/Button';
import firebase from 'firebase/compat/app';
import React, { useState } from 'react'
import { storage , db } from '../firebase';
import "./ImageUpload.css";
import portfolio from '../img/thumbup.png'
// import { ref, uploadBytesResumable,  getDownloadURL } from "firebase/storage";


function ImageUpload({username}) {
   
 const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [caption, setCaption] = useState('');

const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);          
    }
};

const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        //compatible function ....
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          // post image inside db
          db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username
          });

          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    );

  };

  return (
    <div className='imageUpload'>
    
      <div className='back'>
      <center><img src={portfolio} width="60"/></center>
      <br />
     <progress  className="progress" value={progress} max="100"/>
     <br />
     <label className='utext'>Caption :-  </label>
      <input type="text" placeholder="Enter a caption..." 
      value={caption} onChange={event => setCaption(event.target.value)} />
      <br />
      <br />
      <label className='utext'>image :-  </label>
      <input type="file" onChange={handleChange} />
      <br />
      <br />
      <Button className='ubut' onClick={handleUpload}>
        Upload
      </Button>
      <br />
    

      </div>
    </div>
  )
}

export default ImageUpload
// 

