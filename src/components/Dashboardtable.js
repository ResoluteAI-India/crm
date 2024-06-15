import React from 'react'
import './Dashboardtable.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Dashboarddensetable from './Dashboarddensetable'
import IconButton from '@mui/material/IconButton';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
export default function Dashtable() {

  return (
    <>
    <div className='maindiv'>
    <div id='mycards'>
      <div className="card" style={{backgroundColor:"transparent",borderBlockColor:"transparent"}}>
      <Card sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"10px",height:90,width:320}}> 
      <CardContent  sx={{ width: 130,backgroundColor:"#d3d3d3" }}>
      <IconButton style={{backgroundColor:"green",color:"white"}} >
                <PeopleOutlineRoundedIcon />
              </IconButton>
        </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="black" component="div">
            <b>Total client</b>
          </Typography>
          <Typography component="div" variant="h5">
          10
          </Typography>
        </CardContent>
      </Box>
    </Card>
      </div>

      <div className="card" style={{backgroundColor:"transparent",borderBlock:"transparent"}}>
      <Card sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"10px",height:90,width:320}}>
      <CardContent  sx={{ width: 130,backgroundColor:"#d3d3d3" }}>
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
            15
          </Typography>
        </CardContent>
      </Box>
    </Card>
      </div>

      <div className="card" style={{backgroundColor:"transparent",borderBlockColor:"transparent"}}>
      <Card sx={{ display: 'flex' ,marginTop:"10px",marginLeft:"10px",height:90,width:320}}>
      <CardContent  sx={{ width: 130,backgroundColor:"#d3d3d3" }}>
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
           7
          </Typography>
        </CardContent>
      </Box>
    </Card>
      </div>
      </div>
      
      <div id='mytable'>
        <div className="name" style={{marginTop:"40px" ,height:60}}>
          <center><b>LATEST ACTIVITY </b></center>
        </div>
      <Dashboarddensetable />
      </div>
    </div>
     
    </>
  )
}