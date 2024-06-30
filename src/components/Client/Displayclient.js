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
import Displayclienttable from "./Displayclienttable"
import Switch from './Switchclient';
import Switchclient from './Switchclient';




export default function Displayclient () {
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
          Client Information
        </Typography>
        <br />
        <div style={{ display: 'flex', justifyContent:"space-between" }}>
         
          <div>
            <Typography style={{marginLeft:"-5%"}} variant="body2">
              <b>Preferences: </b>
              
            </Typography>
           
            <Typography style={{marginLeft:"-3%"}} variant="body2">
              Service Type : 
            </Typography>
            <Typography  style={{marginLeft:"-16%"}} variant="body2">
              Core Skills :
            </Typography>
            <Typography style={{marginLeft:"6%",width:"100%"}} variant="body2">
              Payment terms:
            </Typography>
          </div>

          <div>
            <Typography style={{marginRight:"150px"}} variant="body2">
              <b>Bank Details: </b>
            </Typography>
           
            <Typography style={{marginRight:"160px"}} variant="body2">
              Bank Name: 
            </Typography>
            <Typography style={{marginRight:"90px"}} variant="body2">
              Account Holder Name: 
            </Typography>
            <Typography style={{marginRight:"125px"}} variant="body2">
              Account Number: 
            </Typography>
            <Typography style={{marginRight:"160px"}} variant="body2">
              IFSC Code: 
            </Typography>
          </div>
        </div>






        <div style={{ display: 'flex', justifyContent:"space-between" }}>
         
          <div>
            <Typography style={{marginLeft:"-5%",marginTop:"20px"}} variant="body2">
              <b>Agreement Tenuree: </b>
              
            </Typography>
           
            <Typography style={{marginLeft:"-1%"}} variant="body2">
              Agreement Start Date : 
            </Typography>
            <Typography  style={{marginLeft:"-2%"}} variant="body2">
            Agreement End Date :
            </Typography>
            
          </div>

          <div>
            <Typography style={{marginRight:"150px",marginTop:"10px"}} variant="body2">
              <b>Spoc Details: </b>
            </Typography>
           
            <Typography style={{marginRight:"160px"}} variant="body2">
              Full Name: 
            </Typography>
            <Typography style={{marginRight:"150px"}} variant="body2">
              Designation: 
            </Typography>
            <Typography style={{marginRight:"125px"}} variant="body2">
              Phone Number: 
            </Typography>
            <Typography style={{marginRight:"170px"}} variant="body2">
              Email ID: 
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>

<br/>








<Switchclient/>
 
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
