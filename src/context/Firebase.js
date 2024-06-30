import { createContext,useContext } from "react";
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyARxGVGBbiT9VszNKKs3B4NPQadqIkOj-M",
  authDomain: "raisw-control-tower.firebaseapp.com",
  projectId: "raisw-control-tower",
  storageBucket: "raisw-control-tower.appspot.com",
  messagingSenderId: "223819894078",
  appId: "1:223819894078:web:961ce0eacdf142fa99b06f"
  };
  

export const useFirebase = () => useContext(FirebaseContext)


const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
export  const  db = getFirestore(firebaseApp);

 

export const FirebaseProvider = (props)=>{
const signupwithemailandpassword = (email,password)=>createUserWithEmailAndPassword(firebaseAuth,email,password)
 const loginwithemailandpassword = (email,password) => signInWithEmailAndPassword(firebaseAuth,email,password)
 const signoutuser=()=>signOut(firebaseAuth)

    return(
        <FirebaseContext.Provider value={{signupwithemailandpassword,loginwithemailandpassword,signoutuser,db}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}