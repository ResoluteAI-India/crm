import React from 'react'
import './Dashboard.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Dashboarddensetable from '../../Previous/Dashboardtable'
import IconButton from '@mui/material/IconButton';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getCountFromServer 
} from "firebase/firestore";
import {useFirebase} from "../../context/Firebase"; 

export default function Dashboardcards() {
  const firebase = useFirebase()

  const[projectcount,setProjectcount] = useState(0)
  const projectgetUsers = async () => {
  const collectionRef = collection(firebase.db, 'Project'); 
  const snapshot = await getCountFromServer(collectionRef)
  const count = snapshot.data().count
  setProjectcount(count)
  }

  const[clientcount,setClientcount] = useState(0)
  const clientgetUsers = async () => {
  const collectionRef = collection(firebase.db, 'Client'); 
  const snapshot = await getCountFromServer(collectionRef)
  const count = snapshot.data().count
  setClientcount(count)
  }

  useEffect(() => {
    projectgetUsers(); 
    clientgetUsers();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  }, []);

    // const empCollectionRef = collection(firebase.db, "projects");
    //  const getUsers = async () => {
    //    const data = await getDocs(empCollectionRef);
    //    console.log(data.count)

    //    }; 

// const getUsers = async () => {
//   const coll = collection(firebase.db, "projects");
//   const snapshot = await getCountFromServer(coll);
//   console.log('count: ', snapshot.data().count);
//      }; 
// const [pro,setPro] = useState(0)
// const empCollectionRef = collection(firebase.db, "clients");

// const getUsers = async () => {
//   const data = await getDocs(empCollectionRef);
//   setPro(data.docs.count);
// };
// console.log(pro)



  return (
    <>
    <div className='maindiv'>
    <div id='mycards'>
      <div className="card" style={{backgroundColor:"transparent",borderBlockColor:"transparent"}}>
      <Card sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:80,width:350}}> 
      <CardContent  sx={{ width: 130,backgroundColor:"#E5E4E2" }}>
      <IconButton style={{backgroundColor:"green",color:"white"}}  >
                <PeopleOutlineRoundedIcon />
              </IconButton>
        </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="black" component="div">
            <b>Total client</b>
          </Typography>
          <Typography component="div" variant="h5">
          {clientcount}
          </Typography>
        </CardContent>
      </Box>
    </Card>
      </div>

      <div className="card" style={{backgroundColor:"transparent",borderBlock:"transparent"}}>
      <Card sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:80,width:350}}>
      <CardContent  sx={{ width: 130,backgroundColor:"#E5E4E2" }}>
      <IconButton style={{backgroundColor:"red",color:"white"}} >
                <ListAltRoundedIcon />
              </IconButton>
        </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="black" component="div">
          <b>Total Projects</b>
          </Typography>
          <Typography component="div" variant="h5">
          {projectcount}
          </Typography>
        </CardContent>
      </Box>
    </Card>
      </div>

      <div className="card" style={{backgroundColor:"transparent",borderBlockColor:"transparent"}}>
      <Card sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:80,width:350}}>
      <CardContent  sx={{ width: 130,backgroundColor:"#E5E4E2" }}>
      <IconButton style={{backgroundColor:"#FFBF00",color:"white"}} >
                <PendingRoundedIcon />
              </IconButton>
        </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="black" component="div">
           <b>On going Projects</b>
          </Typography>
          <Typography component="div" variant="h5">
           25
          </Typography>
        </CardContent>
      </Box>
    </Card>
      </div>
      </div>
      
      <div id='mytable'>
        <div className="name" style={{marginTop:"20px"}}>
          <center><b>LATEST ACTIVITY</b></center>
        </div>
      {/* <Dashboarddensetable/> */}
      </div>
    </div>
     
    </>
  )
}
