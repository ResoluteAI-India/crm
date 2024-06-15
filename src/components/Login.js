import React,{useState} from 'react'
import './Login.css'; 
import {useFirebase} from "../context/Firebase"
import { useNavigate } from 'react-router';



export default function Login() {

  const firebase = useFirebase()
  const navigate  = useNavigate() 

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("logining up a user")
    await firebase.loginwithemailandpassword(email,password)
    console.log("user logged in successfully")
    navigate("/dashboard")

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
    <form className='sform' onSubmit={handleSubmit} >
    <div className="mb-3">
    <label htmlFor="exampleInputEmail2" className="form-label " style={{color:"red"}}><h1>LOGIN</h1></label>
  </div>

  <div className="mb-3">
    <input type="email" className="form-control textboxcolor" id="email_field" aria-describedby="emailHelp" placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email} onKeyUp={validate_email}/>
  </div>
  <span id='email_error' style={{position:"absolute",top:"30%",color:"red"}}></span>

  <div className="mb-3">
    <input type="password" className="form-control textboxcolor" id="password_field" placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password} onKeyUp={validate_password}/>
  </div>
  <span id='password_error' style={{position:"absolute",top:"42%",color:"red"}}></span>

  <button  type="submit" id="loginbtn"className="btn btn-danger"  >Login</button>
</form>
</div>
    </>
  )
}
