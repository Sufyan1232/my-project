import Button from 'react-bootstrap/Button';
import firebase from 'firebase/compat/app';
import React, { useState } from 'react'
import { storage , db } from '../firebase';
import "../ImageUpload/ImageUpload.css";
// import { ref, uploadBytesResumable,  getDownloadURL } from "firebase/storage";


function Detail({username}) {
   
 const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [detail, setDetail] = useState('');

const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);          
    }
};

const handleUpload = () => {
    const uploadTask = storage.ref(`profileimages/${image.name}`).put(image);
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
        .ref("profileimages")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          // post image inside db
          db.collection('dposts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            detail: detail,
            imageUrl: url,
            username: username
          });

          setProgress(0);
          setDetail("");
          setImage(null);
        });
      }
    );

  };

  return (
    <div className='imageUpload'>
    
      <div className='back'>
     <progress  className="progress" value={progress} max="100"/>
      <input type="text" placeholder="Enter a detail..." 
      value={detail} onChange={event => setDetail(event.target.value)} />
      <input type="file" onChange={handleChange} />
      <Button variant="light" onClick={handleUpload}>
        Upload
      </Button>

      </div>
    </div>
  )
}

export default Detail