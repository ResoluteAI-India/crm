import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./components/Authentication/Signup"
import Login from "./components/Authentication/Login"
import {useFirebase} from "./context/Firebase"
import Dashboard from './components/Dashboard/Dashboard';
import Clients from "./components/Client/Clients";
import Projects from './components/Project/Projects';
import Log from "./components/Log/Log"
import Displayclient from "./components/Client/Displayclient"
import Addholder from './components/Client/Addholder';

function App() {

  return (
<Router>
  <Routes>
    <Route path ="/" element = {<center><Dashboard/></center>} />
    <Route path ="/login" element = {<center><Login/></center>} />
    <Route path ="/dashboard" element = {<center><Dashboard/></center>} />

    <Route path ="/clients" element = {<center><Clients/></center>} />
    <Route path ="/addclient" element = {<center><Addholder/></center>} />
    <Route path ="/displayclient" element = {<center><Displayclient/></center>} />

    {/* <Route path ="/editclient" element = {<center><Editclient/></center>} /> */}

   <Route path ="/projects" element = {<center><Projects/></center>} />

    {/* <Route path ="/editproject" element = {<center><Editproject/></center>} />
    <Route path ="/displayproject" element = {<center><Displayproject/></center>} />  */}

    <Route path ="/log" element = {<center><Log/></center>} />
  
  
  </Routes>
  </Router>
  );
}

export default App;
