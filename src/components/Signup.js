import React,{useState}from 'react';
import './Signup.css';
import {useFirebase} from "../context/Firebase"
import { useNavigate } from 'react-router';
 
export default function Signup() {
   
  const firebase = useFirebase()
  const navigate  = useNavigate()
 
 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
 
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("signing up a user")
    await firebase.signupwithemailandpassword(email,password)
    console.log("user signed in successfully")
    navigate("/login")
 
  }
 
  var emailField = document.getElementById("email_field")
  var emailError = document.getElementById("email_error")
 
  var passwordField = document.getElementById("password_field")
  var passwordError = document.getElementById("password_error")
 
  function validate_email(){
    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
      emailError.innerHTML = "Please enter a valid email"
      emailField.style.borderColor = "red"
      return false;
    }
    emailError.innerHTML = ""
    emailField.style.borderColor = "green"
    return true;
  }
 
  function validate_password(){
  if(!passwordField.value.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
    passwordError.innerHTML = "Enter the valid password"
    passwordField.style.borderColor = "red"
    return false;
  }
  passwordError.innerHTML = ""
  passwordField.style.borderColor = "green"
    return true;
  }
 
 
  return (
    <>
    
    <div className='signup'>
    <form className='sform' onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label "  style={{color:"black"}}><h1>SignUp</h1></label>
  </div>
 
  <div className="mb-3">
    <input  type="email" placeholder='Enter email' id='email_field' onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control textboxcolor"  aria-describedby="emailHelp" required onKeyUp={validate_email} />
  </div>
  <span id='email_error' style={{position:"absolute",top:"28%"}}></span>
 
  <div className="mb-3">
    <input  type="password" placeholder='Enter password' id='password_field' onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control textboxcolor" required onKeyUp={validate_password} />
  </div>
  <span id='password_error' style={{position:"absolute",top:"40%"}}></span>
 
  <button type="submit" className="btn btn-danger">Create Account</button>
</form>
</div>
<div >
</div>

    </>
  )
}