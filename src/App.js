import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Client from './components/Client';
import Project from './components/Project';


function App() {
  return (
    <Router>
  <Routes>
  <Route path ="/" element = {<center><Signup/></center>} />
      <Route path ="/login" element = {<center><Login/></center>}/>  
      <Route path ="/dashboard" element = {<center><Dashboard/></center>}/>  
      <Route path ="/client" element = {<center><Client/></center>}/>  
      <Route path ="/project" element = {<center><Project/></center>}/>  
      
      

  </Routes>
  </Router>
    
  );
}

export default App;
