import { createContext,useContext } from "react";
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyB_yT8nx8i85pXYjPJIGpwVimRmPjhYWXQ",
    authDomain: "first-project-3038d.firebaseapp.com",
    projectId: "first-project-3038d",
    storageBucket: "first-project-3038d.appspot.com",
    messagingSenderId: "1072010730544",
    appId: "1:1072010730544:web:ce31c35235d532a96221f5"
  };

export const useFirebase = () => useContext(FirebaseContext)


const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
export  const  db = getFirestore(firebaseApp);

 

export const FirebaseProvider = (props)=>{
const signupwithemailandpassword = (email,password)=>
 createUserWithEmailAndPassword(firebaseAuth,email,password)

const loginwithemailandpassword = (email,password) => 
    signInWithEmailAndPassword(firebaseAuth,email,password)

const signoutuser=()=>signOut(firebaseAuth)
    return(
        <FirebaseContext.Provider value={{signupwithemailandpassword,loginwithemailandpassword,signoutuser,db}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}



  









    