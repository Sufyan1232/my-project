
import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getDownloadURL, ref, uploadBytes, getStorage} from 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCdu6T6NCgM_jOwyrNiM-HwdDc5VOZdRMM",
  authDomain: "uniproject-a7691.firebaseapp.com",
  projectId: "uniproject-a7691",
  storageBucket: "uniproject-a7691.appspot.com",
  messagingSenderId: "171549831196",
  appId: "1:171549831196:web:c59dbe51e692b617162fd9",
  measurementId: "G-KEFX9YH339"
};



// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
// //  const storage = getStorage(firebaseApp)
// const storage = getStorage()
export { auth, db, storage };



// import {updateProfile} from "firebase/auth"
//  import {getDownloadURL, ref, uploadBytes, getStorage} from "firebase/storage"
//  const storage = getStorage()
// export const storage = getStorage(firebaseApp)
// export function useAuth() {

// const [username, setUsername] = useState('');
// const [user, setUser] = useState(null);
// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged((authUser) => {
//      if(authUser) {
//        //user has logged in..
//        console.log(authUser);
//        setUser(authUser);
//      } else {
//        // user has logout
//        setUser(null);
//      }
//    })

//    return () => {
//      unsubscribe();
//    }

//  }, [user, username]);

// }

// export async function upload(file, user, setLoading) {
//   const fileRef = ref(storage, user.id + '.png');
//   setLoading(true);
//   const snapshot = await uploadBytes(fileRef, file);
//  const photoURL = getDownloadURL(fileRef);
//   updateProfile(user, {photoURL: photoURL})
 
//   setLoading(false);
//   alert("uploded file!");
// }

// const firebaseConfig = {
//   apiKey: "AIzaSyC27hra-M7f8OultC-7S78aUV7cM4zEz4o",
//   authDomain: "yourfolio-2b663.firebaseapp.com",
//   projectId: "yourfolio-2b663",
//   storageBucket: "yourfolio-2b663.appspot.com",
//   messagingSenderId: "980498037416",
//   appId: "1:980498037416:web:14e321c02708b1ab2ea09d",
//   measurementId: "G-23TKH5WWRR"
// };