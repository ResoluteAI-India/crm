import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getSectionValueNow } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {Chart as ChartJS} from 'chart.js/auto';
import {Bar,Doughnut,Line} from 'react-chartjs-2';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Projectable from './Projecttable';
import {useFirebase} from "../../context/Firebase"; 
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Projectsinfo() {

  const [rows, setRows] = useState([]);
  const firebase = useFirebase()

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () => {
    const empCollectionRef = collection(firebase.db, "Project");
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const navigate = useNavigate();

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };


  const handleAddclient = (event) =>{
    navigate("/addclient")
  }
  return (
    <>
      <div className="heading" >
          <Typography variant="h4" color="black" component="div" style={{marginTop:"50px",marginBottom:"-40px",marginLeft:"-950px"}}>
           <b>Projects</b>
          </Typography>
          </div>

        <div className="dateserach" style={{display:"flex",justifyContent:"space-evenly"}}>
            
        <div className="date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginLeft:"-60px",marginTop:"40px"}}>
        <DatePicker label="Date"  sx={{width: '30ch'}}
        onChange={(newValue) =>getSectionValueNow(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
    </div>

    <div className="serach" style={{display:"flex",marginLeft:"10px",marginTop:"48px"}}>
    <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              style={{marginTop:"50px"}}
              sx={{ width: 200}}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.project_name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Client" />
              )}
            />
    </div>
    
    <Stack direction="row" spacing={2} style={{marginTop:"62px"}}>
      <Button variant="contained"  style={{marginLeft:"40px",height:"40px",width:"30ch",backgroundColor:"rgba(153, 102, 255, 0.2)",color:"black"}} onClick={handleAddclient}>
        <AddRoundedIcon style={{color:"black"}}/>
        Add Project
      </Button>
    </Stack>
    </div>   

    <div className="graphncards" style={{display:"flex"}}>
<div className="graph"  >
     <Card  sx={{ display: 'flex' ,marginTop:"20px",marginLeft:"-5px"}} style={{width:700}}>
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
</div>

<div className="cards" style={{marginTop:"20px",marginLeft:"60px"}}>
    
<Card id='card1' sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:110,width:250}}> 
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginTop:"20px"}}>
          <Typography variant="subtitle1" color="white" component="div">
            <b>Total Projects</b>
          </Typography>
          <Typography component="div" variant="h5">
   
          </Typography>
        </CardContent>
    </Card>

      <Card  id='card2' sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px",height:110,width:250}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginTop:"20px"}}>
          <Typography variant="subtitle1" color="white" component="div">
          <b>Completed Projects</b>
          </Typography>
          <Typography component="div" variant="h5">
        
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
    </div>
    <Card  sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"5px"}}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{marginTop:"-40px"}}>
        <Projectable/>
        </CardContent>
    </Card>
    </>
  )
}
