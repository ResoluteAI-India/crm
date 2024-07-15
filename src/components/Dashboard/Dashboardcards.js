import React from 'react'
import './Dashboard.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import  "./Cards.css"
import Logtable from "../Log/Logtable";
import {Chart as ChartJS} from 'chart.js/auto';
import {Bar,Doughnut,Line} from 'react-chartjs-2';



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

  return (
    <>
    <div className="page" style={{display:"flex"}}>
      <div className="main">
    <div id='mycards' style={{marginTop:"70px"}}>
      <Card id='card1' sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:110,width:250}}> 
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginTop:"20px"}}>
          <Typography variant="subtitle1" color="white" component="div">
            <b>Total client</b>
          </Typography>
          <Typography component="div" variant="h5">
          {clientcount}
          </Typography>
        </CardContent>
    </Card>

      <Card  id='card2' sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:110,width:250}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginTop:"20px"}}>
          <Typography variant="subtitle1" color="white" component="div">
          <b>Total Projects</b>
          </Typography>
          <Typography component="div" variant="h5">
          {projectcount}
          </Typography>
        </CardContent>
    </Card>

      <Card  id='card3' sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:110,width:250}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginTop:"20px"}}>
          <Typography variant="subtitle1" color="white" component="div">
           <b>On going Projects</b>
          </Typography>
          <Typography component="div" variant="h5">
          </Typography>
        </CardContent>
    </Card>

      </div>

      <div className="graphy">
      <Card  sx={{ display: 'flex' ,marginTop:"50px",marginLeft:"-5px"}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginLeft:"30px",marginTop:"20px"}}>
        <Bar

        data={{
          labels:['January', 'February', 'March', 'April', 'May'],
          datasets:[
            {
              label:"Revenue",
              data:[200,300,400,100,500],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderWidth: 1
            },
            {
              label:"Loss",
              data:[60,30,80,50,70],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderWidth: 1
              
            }
          ]
          
        }}
        />
        </CardContent>
    </Card>

    <Card  sx={{ display: 'flex' ,marginTop:"40px",marginLeft:"-5px"}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginLeft:"30px",marginTop:"20px"}}>
        <Line
        data={{
          labels:['January', 'February', 'March', 'April', 'May'],
          datasets:[
            {
              label:"Revenue",
              data:[200,300,400,100,500],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderWidth: 1
            },
            {
              label:"Loss",
              data:[60,30,80,50,70],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderWidth: 1
              
            }
          ]
          
        }}
        />
        </CardContent>
    </Card>
      </div>
      
      </div>

      <div className="sub">
      <Card  sx={{ display: 'flex' ,marginTop:"80px"}} style={{marginLeft:"20px",width:280,height:340}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginLeft:"-25px"}}>
        <center><b>Budget Report</b></center>
        <Doughnut
        data={{
          labels:['January', 'February', 'March', 'April', 'May'],
          datasets:[
            {
              label:"Revenue",
              data:[200,300,400,100,500],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderWidth: 1
            },
            {
              label:"Loss",
              data:[60,30,80,50,70],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderWidth: 1
              
            }
          ]
          
        }}
        />
        </CardContent>
    </Card>
      <Card  sx={{ display: 'flex' ,marginTop:"30px"}} style={{marginLeft:"20px",width:280,height:340}}>
        <CardContent sx={{ flex: '1 0 auto' }} >
        <center><b>Latest Activities</b></center>

        </CardContent>
    </Card>
      </div>
      
      </div> 
      <Card  sx={{ display: 'flex' ,marginTop:"40px",marginLeft:"5px"}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginLeft:"5px",marginTop:"20px"}}>
        <Logtable/>
        </CardContent>
        </Card>
    </>
  )
}
