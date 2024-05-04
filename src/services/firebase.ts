import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCVz6j8PTwJRDZ1QbyZ0EXEWALLggLhy1o',
  authDomain: 'nextjs-crud-439b2.firebaseapp.com',
  databaseURL: 'https://nextjs-crud-439b2-default-rtdb.firebaseio.com',
  projectId: 'nextjs-crud-439b2',
  storageBucket: 'nextjs-crud-439b2.appspot.com',
  messagingSenderId: '482738685623',
  appId: '1:482738685623:web:907b255edf1eabd3aaaf32',
}

const app = firebase.initializeApp(firebaseConfig)
const database = firebase.database()
const auth = getAuth(app)
auth.languageCode = 'en'
export { database, firebase, auth }
