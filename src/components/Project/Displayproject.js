import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Images from "../Images/img1.png"
import Displayprojecttable from "../Project/Displayprojecttable"

import Switchproject from '../Project/Switchproject';




export default function Displayproject () {
  const theme = useTheme();

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div>
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 145 }}
        image={Images}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography style={{marginLeft:"90%"}} component="div" variant="h5">
            TCS
          </Typography>
          <Typography  style={{marginLeft:"70%",width:"100%"}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>Client Name:</b>Sindhu
          </Typography>
          <Typography  style={{marginLeft:"91%",width:"100%"}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>Email Address:</b>Sindhu@gmail.com
          </Typography>
          <Typography  style={{marginLeft:"73%",width:"100%"}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>Phone Number:</b>12345
          </Typography>
        </CardContent>
       
      </Box>
    </Card>

    <Card sx={{ minWidth: 275,marginTop:"1px"}}>
      <CardContent>
        <Typography  style={{ marginRight:"80%"}}variant="h5" component="div">
          Project Details
        </Typography>
        <br />
        <div style={{ display: 'flex', justifyContent:"space-between" }}>
         
          <div>
            <Typography style={{marginLeft:"10%",width:"100%"}} variant="body2">
              <b>Project Name: </b>
              
            </Typography>
           
            <Typography style={{marginLeft:"-1%"}} variant="body2">
              Description : 
            </Typography>
            <Typography  style={{marginLeft:"-10%"}} variant="body2">
              Start Date :
            </Typography>
            <Typography style={{marginLeft:"-13%",width:"100%"}} variant="body2">
              End Date:
            </Typography>
            <Typography style={{marginLeft:"-30%",width:"100%"}} variant="body2">
             Status:
            </Typography>
          </div>

          
        </div>






        
      </CardContent>
    </Card>
    </div>

<br/>








<Switchproject/>
 
    {/* <div>
        <Typography style={{marginRight:"90%",marginTop:"10px"}}>
           <b>Requirements</b>
        </Typography>
        <hr/>
    </div> */}
  
    {/* <Card sx={{ minWidth: 275,marginTop:"25px"}}>
    <div style={{height:"10%",width:"100%",backgroundColor:"#F7D6D0"}} sx={{height:"50px",marginTop:"-40px"}}>
        <Typography style={{marginRight:"90%",fontSize:"30px",marginBottom:"-40px",height:"10%",marginLeft:"10px"}}>
           <b>Requirements</b>
        </Typography>
       
    </div>
    <Displaytable/>
    </Card>
  */}
    </>

  );
}
