import Button from 'react-bootstrap/Button';
import firebase from 'firebase/compat/app';
import React, { useState } from 'react'
import { storage , db } from './firebase';
import portfolio from "./img/crown.png"

function Uname({username}) {
  const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [caption, setCaption] = useState('');

const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);          
    }
};

const handleUpload = () => {
    const uploadTask = storage.ref(`/profileimages/${image.name}`).put(image);
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
        .ref("/profileimages")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          // post image inside db
          db.collection('dposts').add({
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
    <div className='uname'>
      <center><img src={portfolio} width="60"/></center>
      <br />
    <form>
    <progress  className="progress" value={progress} max="100"/>
    <br />
      <label className='utext'>Detail :-  </label>
      <input type="text"  placeholder="Enter a detail..."
      value={caption} onChange={event => setCaption(event.target.value)}
      />
          <br />
          <br />
      <label className='utext'>Image :- </label>
      <input type="file"  onChange={handleChange} />
          <br />
          <br />
        <Button className='ubut' onClick={handleUpload}>upload</Button> 
        <br />     
    </form>
    </div>
  )
}

export default Uname

