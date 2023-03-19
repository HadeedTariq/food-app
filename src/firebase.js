import { initializeApp,getApp,getApps } from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyC2R_b6paVGkYF7Qr-nTAdzk1z2uBr5qmk",
  authDomain: "resturant-app-c4eae.firebaseapp.com",
  databaseURL: "https://resturant-app-c4eae-default-rtdb.firebaseio.com",
  projectId: "resturant-app-c4eae",
  storageBucket: "resturant-app-c4eae.appspot.com",
  messagingSenderId: "138943592199",
  appId: "1:138943592199:web:c6e6745c5c0d2bcb40f7a2"
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireStore=getFirestore(app)
const storage=getStorage(app)
const auth=getAuth(app)
const provider= new GoogleAuthProvider()
export {fireStore,storage,auth,provider}