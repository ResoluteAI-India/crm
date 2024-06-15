import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./components/Signup"
import Login from "./components/Login"
import {useFirebase} from "./context/Firebase"
import Dashboard from './components/Dashboard';
import Client from './components/Client';
import Project from './components/Project';


function App() {

  const firebase = useFirebase();

  return (
<Router>
  <Routes>
    <Route path ="/" element = {<center><Signup/></center>} />
    <Route path ="/login" element = {<center><Login/></center>} />
    <Route path ="/dashboard" element = {<center><Dashboard/></center>} />
    <Route path ="/client" element = {<center><Client/></center>} />
    <Route path ="/project" element = {<center><Project/></center>} />
  
  </Routes>
  </Router>
  );
}

export default App;
