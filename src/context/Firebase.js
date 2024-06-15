import { createContext,useContext } from "react";
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyCNwXRppOHeKFIzextx7bLLq5NvW3wsXHI",
    authDomain: "first-project-2e1fb.firebaseapp.com",
    projectId: "first-project-2e1fb",
    storageBucket: "first-project-2e1fb.appspot.com",
    messagingSenderId: "762596689761",
    appId: "1:762596689761:web:64b6ac2512cde53e8a6720",
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